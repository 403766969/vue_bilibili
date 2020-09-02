<template>
  <div id="search">
    <!-- 顶部导航 -->
    <path-nav-bar :center="{ text: '搜索', isScrollable: false }" />
    <!-- 搜索框 -->
    <van-search
      v-model="searchParams"
      placeholder="请输入关键字"
      show-action
      @search="onSearch"
      @focus="isShowEmpty = false"
    />
    <!-- 视频显示区 -->
    <video-grid :video-list="showVideoList" />
    <van-empty v-show="isShowEmpty" description="暂无视频" />
    <!-- 分页区 -->
    <van-pagination
      v-if="videoList.length > pageSize"
      prev-text="<"
      next-text=">"
      v-model="currentPage"
      :total-items="videoList.length"
      :items-per-page="pageSize"
      :show-page-size="showPageCount"
      force-ellipses
      @change="hanldeChange"
    />
  </div>
</template>

<script>
import PathNavBar from 'components/content/PathNavBar'
import VideoGrid from 'components/content/VideoGrid'

import { searchVideoApi } from 'network/api'

export default {
  name: 'Search',
  components: {
    PathNavBar,
    VideoGrid
  },
  data() {
    return {
      videoList: [],
      searchParams: '',
      pageSize: 10,
      showPageCount: 3,
      currentPage: 1,
      isShowEmpty: false
    }
  },
  computed: {
    // 显示的视频列表
    showVideoList() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.videoList.slice(start, end)
    }
  },
  methods: {
    // 搜索
    async onSearch() {
      if (this.searchParams === '') {
        return this.$toast.fail('关键字不能为空')
      }
      const params = {
        search: this.searchParams
      }
      const { data: res } = await searchVideoApi(params)
      if (res.code !== 200) {
        return this.$toast.fail('搜索失败')
      }
      if (res.data.length === 0) {
        this.isShowEmpty = true
      }
      this.currentPage = 1
      this.videoList = res.data
    },
    // 分页切换
    hanldeChange() {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style lang="less" scoped>
#search {
  padding-top: 44px;
}
</style>
