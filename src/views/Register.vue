<template>
  <div id="register">
    <!-- 顶部导航 -->
    <path-nav-bar
      :center="{ text: '注册bilibili', isScrollable: false }"
      :left="{ text: '主页', to: '/home' }"
      :right="{ text: '登录', to: '/login' }"
    />
    <!-- 内容区 -->
    <div class="register-content">
      <!-- 注册表单 -->
      <van-form @submit="handleSubmit">
        <div class="fullname-filed">
          <van-field
            label="姓名"
            placeholder="请输入姓名"
            autocomplete="off"
            name="fullname"
            v-model="registerForm.fullname"
            :rules="registerRules.fullname"
            clearable
            required
          />
        </div>
        <div class="username-filed">
          <van-field
            label="用户名"
            placeholder="请输入用户名"
            autocomplete="off"
            name="username"
            v-model="registerForm.username"
            :rules="registerRules.username"
            required
            clearable
          />
        </div>
        <div class="password-filed">
          <van-field
            label="密码"
            placeholder="请输入密码"
            autocomplete="off"
            name="password"
            v-model="registerForm.password"
            :rules="registerRules.password"
            :type="isShowPassword ? 'text' : 'password'"
            required
            clearable
          />
          <van-icon
            v-show="registerForm.password"
            :name="isShowPassword ? 'browsing-history' : 'browsing-history-o'"
            @click="isShowPassword = !isShowPassword"
          />
        </div>
        <div class="repeated-filed">
          <van-field
            label="重复密码"
            placeholder="请重复密码"
            autocomplete="off"
            name="repeated"
            v-model="registerForm.repeated"
            :rules="registerRules.repeated"
            :type="isShowRepeated ? 'text' : 'password'"
            required
            clearable
          />
          <van-icon
            v-show="registerForm.repeated"
            :name="isShowRepeated ? 'browsing-history' : 'browsing-history-o'"
            @click="isShowRepeated = !isShowRepeated"
          />
        </div>
        <van-button round block type="info" native-type="submit">注册</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import PathNavBar from 'components/content/PathNavBar'

import { registerApi } from 'network/api'

export default {
  name: 'Register',
  components: {
    PathNavBar
  },
  data() {
    return {
      registerForm: {
        fullname: '',
        username: '',
        password: '',
        repeated: ''
      },
      registerRules: {
        fullname: [{ required: true, message: '请输入姓名' }],
        username: [
          { required: true, message: '请输入用户名' },
          {
            pattern: /^[a-zA-Z0-9_]{4,16}$/,
            message: '请输入6到16位的英文、数字或下划线'
          }
        ],
        password: [
          { required: true, message: '请输入密码' },
          {
            pattern: /^[a-zA-Z0-9_]{4,16}$/,
            message: '请输入6到16位的英文、数字或下划线'
          }
        ],
        repeated: [
          { required: true, message: '请重复密码' },
          { validator: this.verifyRepeated, message: '密码不一致' }
        ]
      },
      isShowPassword: false,
      isShowRepeated: false
    }
  },
  methods: {
    verifyRepeated(val) {
      return this.registerForm.password === val
    },
    async handleSubmit(val) {
      const data = {
        name: val.fullname,
        username: val.username,
        password: val.password
      }
      const { data: res } = await registerApi(data)
      if (res.code !== 200) {
        return this.$toast.fail(res.msg)
      }
      window.localStorage.setItem('userId', res.id)
      window.localStorage.setItem('userToken', res.objtoken)
      this.$toast.success('注册成功')
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
#register {
  padding-top: 44px;
}

.register-content {
  padding: 10px 0;
}

.van-form {
  .fullname-filed,
  .repeated-filed {
    margin-bottom: 10px;
  }
  .password-filed,
  .repeated-filed {
    position: relative;
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
    background-color: #ff9db5;
    border: none;
  }
}
</style>
