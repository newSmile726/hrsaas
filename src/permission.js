import router from '@/router'
import store from '@/store'
//路由全局前置守卫
const WhiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  if (token) {
    //有token 调用获取用户信息
    if (!store.state.user.usrInfo.userId) {
      // 从vuex中actions中return出来的数据 做路由权限筛选
      const { roles } = await store.dispatch('user/setUserInfo')
      await store.dispatch('permissions/filterRouter', roles)
      next(to.path)
    }
    // 1.登录
    if (to.path === '/login') {
      // /是否进入登录小
      // /1.1是跳到省页
      next('/')
    } else {
      //1.2不是直接进入
      next()
    }
  } else {
    //2.未登录
    //访问的是否在白名单（未登录也能访问的页面
    const isCloues = WhiteList.includes(to.path)
    if (isCloues) {
      //2.1在白名单放行
      next()
    } else {
      //2.2不在白名单跳到登录页
      next('/login')
    }
  }
})
