<template>
  <div id="home">
    <!-- 顶部导航 -->
    <search-nav-bar message="请输入关键字" :avatar="userInfo.user_img ? userInfo.user_img : ''" />
    <!-- 内容区 -->
    <div class="home-content">
      <!-- 分区折叠面板 -->
      <collapse-panle :option-list="categoryTitleList" @select="handleSelect" />
      <!-- 分区标签页 -->
      <van-tabs v-model="currentIndex" animated swipeable>
        <van-tab v-for="item in categoryList" :key="item._id" :title="item.title">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            :offset="10"
            finished-text="暂无更多"
            @load="onLoad"
          >
            <!-- 首页轮播图 -->
            <van-swipe v-if="item.title === '首页'" indicator-color="white" :autoplay="3000">
              <van-swipe-item
                v-for="swipeItem in swipeImgList"
                :key="swipeItem.id"
                @click="$router.push(`/videodetail/${swipeItem.id}`)"
              >
                <img :src="swipeItem.src" />
              </van-swipe-item>
            </van-swipe>
            <!-- 视频显示区 -->
            <video-grid :video-list="item.videoList" />
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import SearchNavBar from 'components/content/SearchNavBar'
import CollapsePanle from 'components/content/CollapsePanle'
import VideoGrid from 'components/content/VideoGrid'

import { getUserInfo } from 'common/mixin'

import { getCategoryListApi, getVideoListApi } from 'network/api'

export default {
  name: 'Home',
  mixins: [getUserInfo],
  components: {
    SearchNavBar,
    CollapsePanle,
    VideoGrid
  },
  data() {
    return {
      categoryList: [],
      currentIndex: 0,
      swipeImgList: [
        {
          id: 9,
          src:
            'https://i1.hdslb.com/bfs/archive/57dc19e400ce29c5f4505b264818db5e77178654.jpg@480w_270h_1c'
        },
        {
          id: 3,
          src:
            'https://i2.hdslb.com/bfs/archive/1271b4dc5c4227f414b587785b5245c163efe543.jpg@480w_270h_1c'
        },
        {
          id: 8,
          src:
            'https://i0.hdslb.com/bfs/archive/5141c56b5f80687fb12aa54a5bbdf1fe7af8485e.jpg@480w_270h_1c'
        },
        {
          id: 12,
          src:
            'https://i2.hdslb.com/bfs/archive/70e7365c4e16fe911b3c2cafeb60a2815662b12a.jpg@480w_270h_1c'
        },
        {
          id: 17,
          src:
            'https://i1.hdslb.com/bfs/archive/a5f5b0e96513726d75c743953b08d03b1ea9bac0.jpg@480w_270h_1c'
        }
      ]
    }
  },
  computed: {
    // 分区标题列表
    categoryTitleList() {
      return this.categoryList.map(item => item.title)
    }
  },
  methods: {
    // 获取分区列表
    async getCategoryList() {
      const { data: res } = await getCategoryListApi()
      this.categoryList = res.map(item => {
        item.videoList = []
        item.page = 0
        item.pagesize = 12
        item.loading = false
        item.finished = false
        return item
      })
    },
    // 获取视频列表
    async getVideoList() {
      const item = this.categoryList[this.currentIndex]
      const categoryId = item._id
      const params = {
        page: item.page++,
        pagesize: item.pagesize
      }
      const { data: res } = await getVideoListApi(categoryId, params)
      item.videoList.push(...res)
      if (res.length < item.pagesize) {
        item.finished = true
      }
      setTimeout(() => {
        item.loading = false
      }, 1000)
    },
    // 上拉加载视频
    onLoad() {
      this.getVideoList()
    },
    // 选择分区
    handleSelect(index) {
      this.currentIndex = index
    }
  },
  created() {
    // 获取登录用户的信息
    const userId = window.localStorage.getItem('userId')
    const userToken = window.localStorage.getItem('userToken')
    if (userId && userToken) {
      this.getUserInfo()
    }
    // 获取分区列表
    this.getCategoryList()
  },
  activated() {
    // 路由激活，获取登录用户的信息
    const userId = window.localStorage.getItem('userId')
    const userToken = window.localStorage.getItem('userToken')
    if (userId && userToken) {
      this.getUserInfo()
    } else {
      this.userInfo = {}
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  padding-top: 44px;
}

.home-content {
  position: relative;
  .collapse-panle {
    position: fixed;
    top: 88px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 9999;
  }
}

/deep/.van-tabs__wrap {
  position: sticky;
  top: 44px;
  z-index: 999;
  padding: 0px 40px 0px 10px;
  background-color: #fff;
}

.van-swipe {
  margin: 10px 10px 0 10px;
}

.van-swipe-item {
  img {
    width: 100%;
  }
}
</style>
