// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from "@/store"
import { Message } from 'element-ui'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
}) // 创建一个axios的实例
service.interceptors.request.use((config)=>{
  // 登录之后的请求才需要请求头Authorization
  if(store.state.user.token){
    config.headers.Authorization='Bearer ' +store.state.user.token
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
  function (error) {
    // 对响应错误做点什么
    Message.error('服务器异常')
    return Promise.reject(error)
  }
) // 响应拦截器
export default service // 导出axios实例
