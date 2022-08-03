import { login, settUserInfoApi, setUserDatilApi } from '@/api'
import { setTokenTime } from '@/utils/auth'
export default {
  namespaced: true,
  state: {
    token: '', //token
    usrInfo: {} //用户信息
  },
  mutations: {
    //登录 获取token
    getToken(state, payload) {
      state.token = payload
    },
    // 获取用户信息
    setUserInfo(state, payload) {
      state.usrInfo = payload
    }
  },
  actions: {
    //登录
    async setToken(context, payload) {
      const data = await login(payload)
      context.commit('getToken', data)
      setTokenTime()
    },
    async setUserInfo(context) {
      //获取用户基本信息
      const userInfoBase = await settUserInfoApi()
      //根据用户id获取用户详细信息
      const userInfoMessage = await setUserDatilApi(userInfoBase.userId)
      // console.log(userInfoMessage)
      //合并数据
      context.commit('setUserInfo', { ...userInfoBase, ...userInfoMessage })
    },
    //退出登录
    logout(context) {
      context.commit('getToken', '')
      context.commit('setUserInfo', {})
    }
  }
}
