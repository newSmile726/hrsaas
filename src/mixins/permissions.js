// 可以定义一个对象，该对象最终会将他混入到组件中
// 组件有的 这个对象都可以有
import permissionsAcions from '@/constant/permission'
export default {
  data() {
    return {
      point: permissionsAcions // 权限按钮映射表 魔法元素
    }
  },
  methods: {
    //权限按钮控制
    isHas(point) {
      return this.$store.state.permissions.points.includes(point)
    }
  }
}
