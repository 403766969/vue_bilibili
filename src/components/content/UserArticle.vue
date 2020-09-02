<template>
  <div class="user-article">
    <!-- 动态和视频标签区 -->
    <div class="article-type">
      <span :class="{ active: current === 'news' }" @click="current = 'news'">动态</span>
      <span :class="{ active: current === 'videos' }" @click="current = 'videos'">视频</span>
    </div>
    <!-- 动态和视频内容区 -->
    <div class="article-content">
      <div v-show="current === 'news'">
        <van-empty description="暂无动态" />
      </div>
      <div v-show="current === 'videos'">
        <van-empty description="暂无视频" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserArticle',
  data() {
    return {
      current: 'news'
    }
  }
}
</script>

<style lang="less" scoped>
.user-article {
  background-color: #fff;
}

.article-type {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  border-top: 0.1px solid #ddd;
  span {
    margin: 0 8px;
    font-size: 16px;
    color: #777;
  }
  .active {
    color: #ff9db5;
  }
}

.article-content {
  padding: 20px;
}
</style>
