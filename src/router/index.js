import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Register = () => import('views/Register')
const Login = () => import('views/Login')
const Home = () => import('views/Home')
const VideoDetail = () => import('views/VideoDetail')
const UserSpace = () => import('views/UserSpace')
const EditInfo = () => import('views/EditInfo')

const beforeEnter = (to, from, next) => {
  const userId = window.localStorage.getItem('userId')
  const userToken = window.localStorage.getItem('userToken')
  if (userId && userToken) {
    Vue.prototype.$toast.fail('请先注销当前账号')
    return next('/home')
  }
  next()
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      title: '注册',
      needLogin: false,
      keepAlive: false
    },
    component: Register,
    beforeEnter
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      needLogin: false,
      keepAlive: false
    },
    component: Login,
    beforeEnter
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '主页',
      needLogin: false,
      keepAlive: true
    },
    component: Home
  },
  {
    path: '/videodetail/:id',
    name: 'VideoDetail',
    meta: {
      title: '视频详情',
      needLogin: false,
      keepAlive: false
    },
    component: VideoDetail
  },
  {
    path: '/userspace',
    name: 'UserSpace',
    meta: {
      title: '用户空间',
      needLogin: true,
      keepAlive: false
    },
    component: UserSpace
  },
  {
    path: '/editinfo',
    name: 'EditInfo',
    meta: {
      title: '编辑资料',
      needLogin: true,
      keepAlive: false
    },
    component: EditInfo
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(path) {
  return originalPush.call(this, path).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(path) {
  return originalReplace.call(this, path).catch(err => err)
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (to.meta.needLogin) {
    const userId = window.localStorage.getItem('userId')
    const userToken = window.localStorage.getItem('userToken')
    if (!userId || !userToken) {
      Vue.prototype.$toast.fail('登录状态已失效，请重新登录')
      return next('/login')
    }
  }
  next()
})

export default router
