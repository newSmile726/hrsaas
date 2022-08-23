import router, { constantRoutes, asyncRouters } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], //自己维护的路由规则 菜单依赖的路由规则因为动态路由娶不到了，所以需要我们从新维护一个路由规则
    points: [] // 按钮权限
  },
  mutations: {
    setRouters(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    }
  },
  actions: {
    filterRouter(context, roles) {
      const routes = asyncRouters.filter((item) => {
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRouters', routes)  // 存储路由权限
      context.commit('setPoints', roles.points) //存储按钮权限
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
    }
  }
}
