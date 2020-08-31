import axios from 'axios'
import Vue from 'vue'

// 创建axios实例
const http = axios.create({
  baseURL: 'http://112.74.99.5:3000/web/api',
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(config => {
  if (window.localStorage.getItem('userToken')) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('userToken')
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
http.interceptors.response.use(res => {
  return res
}, err => {
  Vue.prototype.$toast.fail(err.response.data.message)
  return Promise.reject(err)
})

export default http
