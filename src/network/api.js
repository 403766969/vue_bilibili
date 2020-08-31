import http from './http'

// 注册
export const registerApi = data => http.post('/register', data)

// 登录
export const loginApi = data => http.post('/login', data)

// 获取用户信息
export const getUserInfoApi = userId => http.get(`/user/${userId}`)

// 上传头像
export const uploadAvatar = data => http.post('/upload', data)

// 更新用户信息
export const updateUserInfoApi = (userId, data) => http.post(`/update/${userId}`, data)

// 获取分类列表
export const getCategoryListApi = () => http.get('/category')

// 获取视频列表
export const getVideoListApi = (categoryId, params) => http.get(`/detail/${categoryId}`, { params })

// 获取视频详情
export const getVideoDetailApi = videoId => http.get(`/article/${videoId}`)

// 获取推荐列表
export const getRecommendListApi = () => http.get('commend')

// 关注作者
export const likeAuthorApi = (userId, data) => http.post(`/sub_scription/${userId}`, data)

// 收藏视频
export const starVideoApi = (userId, data) => http.post(`/collection/${userId}`, data)

// 获取关注状态
export const getLikeStatusApi = (userId, params) => http.get(`/sub_scription/${userId}`, { params })

// 获取收藏状态
export const getStarStatusApi = (userId, params) => http.get(`/collection/${userId}`, { params })
