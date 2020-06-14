import axios from 'axios'
import Vue from 'vue'
import router from '../router'
const http = axios.create({
  // 变量名必须以VUE_APP开头
  baseURL: process.env.VUE_APP_API_URL || '/admin/api'
  // baseURL: 'http://localhost:3000/admin/api'
})

// 拦截请求，带上token
http.interceptors.request.use(
  config => {
    // 添加请求头
    if (localStorage.token) config.headers.Authorization = 'Bearer ' + localStorage.token
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 规定请求失败返回 message 提示用户错误原因
http.interceptors.response.use(
  res => {
    return res
  },
  err => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
    }
    // 错误码为401，表示用户未登录，跳转到登录页
    if (err.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(err)
  }
)
export default http
