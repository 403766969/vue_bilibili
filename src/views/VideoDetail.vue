<template>
  <div id="video-detail">
    <!-- 顶部导航 -->
    <path-nav-bar
      :center="{ text: videoInfo.name, isScrollable: true }"
      :left="{ text: '主页', to: '/home' }"
    />
    <!-- 内容区 -->
    <div class="video-detail-content">
      <!-- <video :src="videoInfo.src" :poster="videoInfo.poster" controls></video> -->
      <video-player
        class="video-player"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      />
      <van-tabs animated swipeable>
        <van-tab title="简介">
          <div class="info-content">
            <div class="info-author">
              <img class="border-px-to-vw-ignore" :src="authorInfo.user_img" />
              <span>{{authorInfo.name}}</span>
            </div>
            <div class="info-base">
              <i>{{videoInfo.category}}</i>
              <span class="van-ellipsis">{{videoInfo.name}}</span>
            </div>
            <div class="info-heat">
              <p>
                <van-icon name="video-o" />
                <span>223.3万次</span>
              </p>
              <p>
                <van-icon name="comment-o" />
                <span>666</span>
              </p>
              <p>
                <van-icon name="underway-o" />
                <span>{{videoInfo.date}}</span>
              </p>
            </div>
            <div class="info-follow">
              <p>
                <van-icon :name="isLike ? 'like' : 'like-o'" @click="handleLike" />
                <span>关注</span>
              </p>
              <p>
                <van-icon :name="isStar ? 'star' : 'star-o'" @click="handleStar" />
                <span>收藏</span>
              </p>
              <p>
                <van-icon name="share" />
                <span>分享</span>
              </p>
            </div>
          </div>
          <video-grid :video-list="recommendList" />
        </van-tab>
        <van-tab title="评论">
          <p>评论</p>
          <p>评论</p>
          <p>评论</p>
          <p>评论</p>
          <p>评论</p>
          <p>评论</p>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import PathNavBar from 'components/content/PathNavBar'
import VideoGrid from 'components/content/VideoGrid'

import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

import {
  getVideoDetailApi,
  getRecommendListApi,
  likeAuthorApi,
  starVideoApi,
  getLikeStatusApi,
  getStarStatusApi
} from 'network/api'

export default {
  name: 'VideoDetail',
  components: {
    PathNavBar,
    VideoGrid,
    videoPlayer
  },
  data() {
    return {
      videoInfo: {
        src: '',
        poster: '',
        category: '',
        name: '',
        date: ''
      },
      playerOptions: {
        playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: '' // url地址
          }
        ],
        poster: '', // 你的封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true // 全屏按钮
        }
      },
      authorInfo: {},
      recommendList: [],
      isLike: false,
      isStar: false
    }
  },
  methods: {
    async getVideoDetail() {
      // const { data: res } = await getVideoDetailApi(this.$route.params.id)
      const { data: res } = await getVideoDetailApi(23)
      this.videoInfo.src = res[0].content
      this.videoInfo.poster = res[0].img
      this.videoInfo.category = res[0].category.title
      this.videoInfo.name = res[0].name
      this.videoInfo.date = res[0].date
      this.authorInfo = res[0].userinfo
      // playerOptions
      this.playerOptions.sources[0].src = res[0].content
      this.playerOptions.poster = res[0].img
      // 初始化关注和收藏状态
      const userId = window.localStorage.getItem('userId')
      const userToken = window.localStorage.getItem('userToken')
      if (userId && userToken) {
        this.initLikeStatus()
        this.initStarStatus()
      }
    },
    async getRecommendList() {
      const { data: res } = await getRecommendListApi('/commend')
      this.recommendList = res
    },
    async handleLike() {
      const userId = window.localStorage.getItem('userId')
      const userToken = window.localStorage.getItem('userToken')
      if (!userId || !userToken) {
        return this.$toast.fail('请先登录')
      }
      const data = {
        sub_id: this.authorInfo.id
      }
      const { data: res } = await likeAuthorApi(userId, data)
      if (res.code !== 200) {
        return this.$toast.fail('操作失败')
      }
      this.isLike = !this.isLike
      this.$toast.success(res.msg)
    },
    async handleStar() {
      const userId = window.localStorage.getItem('userId')
      const userToken = window.localStorage.getItem('userToken')
      if (!userId || !userToken) {
        return this.$toast.fail('请先登录')
      }
      const data = {
        article_id: this.$route.params.id
      }
      const { data: res } = await starVideoApi(userId, data)
      if (res.code !== 200) {
        return this.$toast.fail('操作失败')
      }
      this.isStar = !this.isStar
      this.$toast.success(res.msg)
    },
    async initLikeStatus() {
      const userId = window.localStorage.getItem('userId')
      const params = {
        sub_id: this.authorInfo.id
      }
      const { data: res } = await getLikeStatusApi(userId, params)
      if (res.code !== 200) {
        return this.$toast.fail('获取关注状态失败')
      }
      this.isLike = res.success
    },
    async initStarStatus() {
      const userId = window.localStorage.getItem('userId')
      const params = {
        article_id: this.$route.params.id
      }
      const { data: res } = await getStarStatusApi(userId, params)
      if (res.code !== 200) {
        return this.$toast.fail('获取收藏状态失败')
      }
      this.isStar = res.success
    }
  },
  created() {
    this.getVideoDetail()
    this.getRecommendList()
  }
}
</script>

<style lang="less" scoped>
#video-detail {
  padding-top: 44px;
}

.video-detail-content {
  video {
    width: 100%;
  }
  .video-player {
    width: 100%;
  }
}

.info-content {
  padding: 5px;
  .info-author,
  .info-base,
  .info-heat,
  .info-follow {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .info-author {
    margin-bottom: 5px;
    img {
      margin-right: 5px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
    .border-px-to-vw-ignore {
      border: 1px solid #f4f4f4;
    }
    span {
      font-size: 16px;
    }
  }
  .info-base {
    margin-bottom: 10px;
    i {
      margin: 0 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background-color: #ffafc9;
      border-radius: 9px;
    }
    span {
      flex: 1;
      font-size: 18px;
    }
  }
  .info-heat,
  .info-follow {
    margin-bottom: 10px;
    font-size: 14px;
    p {
      margin-right: 10px;
      .van-icon {
        margin-right: 2px;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
    p:first-child {
      margin-left: 6px;
    }
  }
}
</style>
