import{login} from "@/api"
export default {
  namespaced: true,
  state: {
    token:''
  },
  mutations: {
    getToken(state,payload){
      state.token=payload
    }
  },
  actions: {
   async setToken(context,payload){
      const data=await login(payload)
      context.commit('getToken',data)
    }
  }
}
