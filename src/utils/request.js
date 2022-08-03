// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTokenTime } from '@/utils/auth'
import router from '@/router'
//封装处理token过期方法
function isTimeOut() {
  const currentTime = Date.now() //当前时间戳
  const tokenTime = getTokenTime() //登录的时间戳
  const timeOut = 2 * 60 * 60 * 1000 //约定登录过期时间
  return currentTime - tokenTime > timeOut
}

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, //环境变量配置了访问基础路径
  timeout: 3000
}) // 创建一个axios的实例
service.interceptors.request.use(async (config) => {
  // 登录之后的请求才需要请求头Authorization
  if (store.state.user.token) {
    if (isTimeOut()) {
      // 调用处理token过期方法 如果为true说明过期 跳转到登录页
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录过期'))
    } else {
      //如果没有就携带token发生请求
      config.headers.Authorization = 'Bearer ' + store.state.user.token
    }
  }
  return config
}) // 请求拦截器
service.interceptors.response.use(
  (res) => {
    const { success, data, message } = res.data
    if (success) {
      return data
    }
    Message.error(message)
    return Promise.reject(new Error(message))
  },
  async function (error) {
    // 对响应错误做点什么
    if (error?.response?.status === 401) {
      await store.dispatch('user/logout')
      router.push('/login')
      Message.error('登录过期')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
