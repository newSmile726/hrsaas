import pageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
const components = [pageTools, UploadExcel]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
//多个组件 调用组件实列的name做为Vue.component的第一个值 第二个要注册的就是当前项的本身
