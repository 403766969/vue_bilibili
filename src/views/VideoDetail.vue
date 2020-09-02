<template>
  <div id="video-detail">
    <!-- 顶部导航 -->
    <path-nav-bar
      :center="{ text: videoInfo.name, isScrollable: true }"
      :left="{ text: '主页', to: '/home' }"
    />
    <!-- 内容区 -->
    <div class="video-detail-content" ref="contentRef">
      <!-- 视频播放器 -->
      <!-- <video :src="videoInfo.src" :poster="videoInfo.poster" controls></video> -->
      <video-player
        class="video-player"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
      />
      <!-- 简介和评论标签页 -->
      <van-tabs animated swipeable ref="vanTabsRef">
        <van-tab title="简介">
          <div class="info-content">
            <!-- 作者信息 -->
            <div class="info-author">
              <img class="border-px-to-vw-ignore" :src="authorInfo.user_img" />
              <span>{{authorInfo.name}}</span>
            </div>
            <!-- 视频简介 -->
            <div class="info-base">
              <i>{{videoInfo.category}}</i>
              <span class="van-ellipsis">{{videoInfo.name}}</span>
            </div>
            <!-- 视频热度 -->
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
            <!-- 用户操作 -->
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
          <!-- 推荐列表 -->
          <video-grid :video-list="recommendList" />
        </van-tab>
        <van-tab title="评论">
          <!-- 发表评论 -->
          <div class="publish-comment">
            <img v-if="userInfo.user_img" :src="userInfo.user_img" />
            <img v-else src="~assets/img/default_img.jpg" />
            <van-field v-model="commentInput" placeholder="说点什么吧" />
            <van-button type="info" color="#ffafc9" round @click="handlePublish">发表</van-button>
          </div>
          <!-- 回复评论 -->
          <div class="relpy-comment">
            <p class="reply-label">{{replyLabel}}</p>
            <van-field v-model="replyInput" ref="replyRef" placeholder="回复点什么吧" />
            <van-button type="info" color="#ffafc9" round @click="handleReply">回复</van-button>
          </div>
          <!-- 评论显示区 -->
          <comment :comment-list="showCommentList" @replyComment="replyComment" />
          <!-- 分页区 -->
          <van-pagination
            v-if="commentList.length > commentPageSize"
            prev-text="<"
            next-text=">"
            v-model="commentPage"
            :total-items="commentList.length"
            :items-per-page="commentPageSize"
            :show-page-size="commentShowPage"
            force-ellipses
            @change="hanldeChange"
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import PathNavBar from 'components/content/PathNavBar'
import VideoGrid from 'components/content/VideoGrid'
import Comment from 'components/content/Comment'

import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

import { getUserInfo } from 'common/mixin'

import {
  getVideoDetailApi,
  getRecommendListApi,
  likeAuthorApi,
  starVideoApi,
  getLikeStatusApi,
  getStarStatusApi,
  getCommentListApi,
  publishCommentApi
} from 'network/api'

export default {
  name: 'VideoDetail',
  mixins: [getUserInfo],
  components: {
    PathNavBar,
    VideoGrid,
    Comment,
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
      commentList: [],
      commentPage: 1,
      commentPageSize: 10,
      commentShowPage: 5,
      commentInput: '',
      replyInput: '',
      replyLabel: '',
      replyItem: {},
      scrollTop: 0,
      isLike: false,
      isStar: false
    }
  },
  computed: {
    // 显示的评论列表
    showCommentList() {
      const start = (this.commentPage - 1) * this.commentPageSize
      const end = this.commentPage * this.commentPageSize
      return this.commentList.slice(start, end)
    }
  },
  methods: {
    // 获取视频列表
    async getVideoDetail() {
      const { data: res } = await getVideoDetailApi(this.$route.params.id)
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
    // 获取推荐列表
    async getRecommendList() {
      const { data: res } = await getRecommendListApi('/commend')
      this.recommendList = res
    },
    // 关注
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
    // 收藏
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
    // 获取关注状态
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
    // 获取收藏状态
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
    },
    // 获取评论列表
    async getCommentList() {
      const { data: res } = await getCommentListApi(this.$route.params.id)
      const primaryCommentList = res.filter(item => {
        if (item.parent_id === null) {
          item.child = []
          return true
        }
        return false
      })
      res.forEach(item => {
        if (item.parent_id !== null) {
          const primaryComment = this.findPrimaryComment(res, item.comment_id)
          if (primaryComment && primaryComment.child) {
            primaryComment.child.push(item)
          }
        }
      })
      this.commentPage = 1
      this.commentList = primaryCommentList
    },
    // 查找回复的顶级评论
    findPrimaryComment(res, parentId) {
      const temp = res.find(item => item.comment_id === parseInt(parentId))
      if (temp) {
        if (temp.parent_id === null) {
          return temp
        }
        return this.findPrimaryComment(res, temp.parent_id)
      }
      return null
    },
    // 分区切换
    hanldeChange() {
      const top1 = this.$refs.contentRef.offsetTop
      const top2 = this.$refs.vanTabsRef.$el.offsetTop
      window.scrollTo(0, top2 - top1 + 1)
    },
    // 发表评论
    async handlePublish() {
      const userId = window.localStorage.getItem('userId')
      const userToken = window.localStorage.getItem('userToken')
      if (!userId || !userToken) {
        return this.$toast.fail('请先登录')
      }
      if (this.commentInput === '') {
        return this.$toast.fail('评论不能为空')
      }
      const data = {
        comment_content: this.commentInput,
        comment_date: this.getDate(),
        article_id: this.$route.params.id,
        parent_id: null
      }
      const res = await publishCommentApi(userId, data)
      if (res.status !== 200) {
        return this.$toast.fail('发表评论失败')
      }
      this.$toast.fail('发表评论成功')
      this.commentInput = ''
      await this.getCommentList()
      this.commentPage = Math.ceil(
        this.commentList.length / this.commentPageSize
      )
      window.scrollTo(0, document.body.clientHeight)
    },
    // 获取日期
    getDate() {
      const date = new Date()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      const dateStr = `${m}-${d}`
      return dateStr
    },
    // 子组件点击回复
    replyComment(item) {
      const userId = window.localStorage.getItem('userId')
      const userToken = window.localStorage.getItem('userToken')
      if (!userId || !userToken) {
        return this.$toast.fail('请先登录')
      }
      this.replyItem = item
      const name = item.userinfo ? item.userinfo.name : '匿名'
      this.replyLabel = `@${name}：`
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      this.$refs.replyRef.focus()
    },
    // 回复评论
    async handleReply() {
      const userId = window.localStorage.getItem('userId')
      const userToken = window.localStorage.getItem('userToken')
      if (!userId || !userToken) {
        return this.$toast.fail('请先登录')
      }
      if (!this.replyItem.comment_id) {
        return this.$toast.fail('请选择要回复的评论')
      }
      if (this.replyInput === '') {
        return this.$toast.fail('回复不能为空')
      }
      const data = {
        comment_content: this.replyInput,
        comment_date: this.getDate(),
        article_id: this.$route.params.id,
        parent_id: this.replyItem.comment_id
      }
      const res = await publishCommentApi(userId, data)
      if (res.status !== 200) {
        return this.$toast.fail('回复评论失败')
      }
      this.$toast.fail('回复评论成功')
      this.replyItem = {}
      this.replyInput = ''
      this.replyLabel = ''
      this.getCommentList()
      window.scrollTo(0, this.scrollTop)
    }
  },
  created() {
    // 获取视频列表
    this.getVideoDetail()
    // 获取推荐列表
    this.getRecommendList()
    // 获取评论列表
    this.getCommentList()
    // 获取登录用户的信息
    const userId = window.localStorage.getItem('userId')
    const userToken = window.localStorage.getItem('userToken')
    if (userId && userToken) {
      this.getUserInfo()
    }
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
.publish-comment {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 0px 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .van-field {
    flex: 1;
  }
  .van-button {
    height: 30px;
    padding: 0px 15px;
    font-size: 14px;
  }
}

.relpy-comment {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 0px 10px;
  .reply-label {
    font-size: 14px;
    color: #0a9ed3;
  }
  .van-field {
    flex: 1;
  }
  .van-button {
    height: 30px;
    padding: 0px 15px;
    font-size: 14px;
  }
}
</style>
