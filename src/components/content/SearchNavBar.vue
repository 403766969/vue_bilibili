<template>
  <div class="search-nav-bar">
    <nav-bar>
      <!-- 左侧导航 -->
      <template #nar-bar-left>
        <img src="~assets/img/logo.png" @click="$router.go(0)" />
      </template>
      <!-- 中部导航 -->
      <template #nar-bar-center>
        <div @click="$router.push('/search')">
          <van-icon name="search" />
          <span>{{message}}</span>
        </div>
      </template>
      <!-- 右侧导航 -->
      <template #nar-bar-right>
        <img v-if="avatar" :src="avatar" @click="$router.push('/userspace')" />
        <img v-else src="~assets/img/default_img.jpg" @click="$router.push('/userspace')" />
        <span @click="handleDownload">下载App</span>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/NavBar'

export default {
  name: 'SearchNavBar',
  components: {
    NavBar
  },
  props: {
    message: {
      type: String,
      default: '请输入关键字'
    },
    avatar: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 下载App按钮，实际注销当前登录用户
    handleDownload() {
      this.$dialog
        .confirm({
          message: '即将注销'
        })
        .then(() => {
          window.localStorage.removeItem('userId')
          window.localStorage.removeItem('userToken')
          this.$toast.success('注销成功')
          this.$router.push('/login')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.search-nav-bar {
  /deep/.nar-bar-left {
    width: 85px;
    img {
      width: 100%;
    }
  }

  /deep/.nar-bar-right {
    width: 120px;
    img {
      margin-right: 6px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    span {
      width: 80px;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      color: #fff;
      background-color: #ff9db5;
      border-radius: 4px;
    }
  }

  /deep/.nar-bar-center {
    div {
      position: relative;
      width: 90%;
      height: 24px;
      line-height: 24px;
      background-color: #f4f4f4;
      border-radius: 12px;
      .van-icon {
        position: absolute;
        top: 50%;
        left: 8px;
        transform: translateY(-50%);
      }
      span {
        font-size: 15px;
        color: #999;
      }
    }
  }
}
</style>
