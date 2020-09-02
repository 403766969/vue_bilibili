<template>
  <div id="login">
    <!-- 顶部导航 -->
    <path-nav-bar
      :center="{ text: '登录bilibili', isScrollable: false }"
      :left="{ text: '主页', to: '/home' }"
      :right="{ text: '注册', to: '/register' }"
    />
    <!-- 内容区 -->
    <div class="login-content">
      <!-- 登录表单 -->
      <van-form @submit="handleSubmit">
        <div class="username-filed">
          <van-field
            label="用户名"
            placeholder="请输入用户名"
            autocomplete="off"
            name="username"
            v-model="loginForm.username"
            clearable
          />
        </div>
        <div class="password-filed">
          <van-field
            label="密码"
            placeholder="请输入密码"
            autocomplete="off"
            name="password"
            v-model="loginForm.password"
            :type="isShowPassword ? 'text' : 'password'"
            clearable
          />
          <van-icon
            v-show="loginForm.password"
            :name="isShowPassword ? 'browsing-history' : 'browsing-history-o'"
            @click="isShowPassword = !isShowPassword"
          />
        </div>
        <van-button round block type="info" color="#ff9db5" native-type="submit">登录</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import PathNavBar from 'components/content/PathNavBar'

import { loginApi } from 'network/api'

export default {
  name: 'Login',
  components: {
    PathNavBar
  },
  data() {
    return {
      loginForm: {
        username: 'oecoec',
        password: '114514'
      },
      isShowPassword: false
    }
  },
  methods: {
    // 提交登录表单
    async handleSubmit(val) {
      const { data: res } = await loginApi(val)
      if (res.code !== 200) {
        return this.$toast.fail(res.msg)
      }
      window.localStorage.setItem('userId', res.id)
      window.localStorage.setItem('userToken', res.token)
      this.$toast.success('登录成功')
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  padding-top: 44px;
}

.login-content {
  padding: 10px 0;
}

.van-form {
  .password-filed {
    position: relative;
    margin-bottom: 10px;
    .van-icon {
      position: absolute;
      top: 22px;
      right: 35px;
      transform: translateY(-50%);
    }
  }
  .van-button {
    margin: 0 auto;
    width: 90%;
    font-size: 16px;
    color: #fff;
  }
}
</style>
