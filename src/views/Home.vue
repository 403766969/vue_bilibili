<template>
  <div id="home">
    <!-- 顶部导航 -->
    <search-nav-bar message="请输入关键字" :avatar="userInfo.user_img ? userInfo.user_img : ''" />
    <!-- 内容区 -->
    <div class="home-content">
      <van-tabs v-model="currentIndex" offset-top="11.733vw" animated sticky swipeable>
        <van-tab v-for="item in categoryList" :key="item._id" :title="item.title">
          <van-list
            v-model="item.loading"
            :finished="item.finished"
            :offset="10"
            finished-text="暂无更多"
            @load="onLoad"
          >
            <van-swipe v-if="item.title === '首页'" indicator-color="white" :autoplay="3000">
              <van-swipe-item
                v-for="swipeItem in swipeImgList"
                :key="swipeItem.id"
                @click="$router.push(`/videodetail/${swipeItem.id}`)"
              >
                <img :src="swipeItem.src" />
              </van-swipe-item>
            </van-swipe>

            <video-grid :video-list="item.videoList" />
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import SearchNavBar from 'components/content/SearchNavBar'
import VideoGrid from 'components/content/VideoGrid'

import { getUserInfo } from 'common/mixin'

import { getCategoryListApi, getVideoListApi } from 'network/api'

export default {
  name: 'Home',
  mixins: [getUserInfo],
  components: {
    SearchNavBar,
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
  methods: {
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
    async getVideoList() {
      const item = this.categoryList[this.currentIndex]
      const categoryId = item._id
      const params = {
        page: item.page,
        pagesize: item.pagesize
      }
      const { data: res } = await getVideoListApi(categoryId, params)
      item.videoList.push(...res)
      if (res.length < item.pagesize) {
        item.finished = true
      }
      item.page++
      setTimeout(() => {
        item.loading = false
      }, 1000)
    },
    onLoad() {
      this.getVideoList()
    }
  },
  created() {
    const userId = window.localStorage.getItem('userId')
    const userToken = window.localStorage.getItem('userToken')
    if (userId && userToken) {
      this.getUserInfo()
    }
    this.getCategoryList()
  },
  activated() {
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

.van-swipe {
  margin: 10px 10px 0 10px;
}

.van-swipe-item {
  img {
    width: 100%;
  }
}
</style>
