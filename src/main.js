import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import i18n from "@/i18n" // 语言包

import App from './App'
import store from './store'
import router from './router'

//自定义指令引入
import * as directives from '@/directive'
//全局组件封装引入
import components from '@/components'
//封装全局过滤器引入
import * as filters from '@/filters'
//打印
import Print from 'vue-print-nb'
import '@/icons' // icon
import '@/permission' // permission control

// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// 注册组件
Vue.use(components)
//注册打印
Vue.use(Print)
//统一注册过滤器
for (let key in filters) {
  Vue.filter(key, filters[key])
}
//统一循环注册自定义指令
for (let key in directives) {
  Vue.directive(key, directives[key])
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: (h) => h(App)
})
