<template>
  <div class="path-nav-bar">
    <nav-bar>
      <!-- 左侧导航 -->
      <template #nar-bar-left>
        <router-link v-if="left && left.text && left.to" :to="left.to" tag="span">{{left.text}}</router-link>
        <van-icon v-else name="arrow-left" @click="$router.back()" />
      </template>
      <!-- 中部导航 -->
      <template #nar-bar-center>
        <van-notice-bar v-if="center.isScrollable" :text="center.text" scrollable />
        <span v-else>{{center.text}}</span>
      </template>
      <!-- 右侧导航 -->
      <template #nar-bar-right>
        <router-link v-if="right && right.text && right.to" :to="right.to" tag="span">{{right.text}}</router-link>
        <van-icon v-else name="replay" @click="reloadRouter" />
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar'

export default {
  name: 'PathNavBar',
  inject: ['reloadRouter'], // 注入刷新路由方法
  components: {
    NavBar
  },
  props: {
    center: {
      type: Object,
      default() {
        return {
          text: '',
          isScrollable: false
        }
      }
    },
    left: {
      type: Object,
      default() {
        return {}
      }
    },
    right: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.van-notice-bar {
  width: 100%;
  font-size: 16px;
  color: #666;
  background-color: transparent;
}
</style>
