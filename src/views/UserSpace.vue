<template>
  <div id="user-space">
    <!-- 顶部导航 -->
    <path-nav-bar :center="{ text: '个人空间', isScrollable: false }" />
    <!-- 内容区 -->
    <div class="user-space-content">
      <div class="backImg"></div>
      <user-info :user-info="userInfo" />
      <user-article />
    </div>
  </div>
</template>

<script>
import PathNavBar from 'components/content/PathNavBar'
import UserInfo from 'components/content/UserInfo'
import UserArticle from 'components/content/UserArticle'

import { getUserInfo } from 'common/mixin'

export default {
  name: 'UserSpace',
  mixins: [getUserInfo],
  components: {
    PathNavBar,
    UserInfo,
    UserArticle
  },
  created() {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
#user-space {
  padding-top: 44px;
}

.user-space-content {
  .backImg {
    width: 100%;
    height: 90px;
    background: url('~assets/img/bannerTop_new.png') no-repeat center;
    background-size: cover;
  }
}
</style>
