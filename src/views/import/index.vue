<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :beforeUpload="uploadSucees" :onSuccess="onSuccess" />
    </div>
  </div>
</template>
<script>
import { importMapKeyPathApi } from '@/api'
import { formatTime } from '@/filters'
import employees from '@/constant/employees'
const { importMapKeyPath } = employees
export default {
  name: 'Import',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    uploadSucees({ name }) {
      if (!name.endsWith('.xlsx')) {
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            //excel 时间戳
            const timestamp = item[key]
            //转换成js时间戳  先格式化当前时间戳减去70年
            const data = new Date((timestamp - 1) * 24 * 3600000)
            data.setFullYear(data.getFullYear() - 70)
            obj[importMapKeyPath[key]] = formatTime(data)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      await importMapKeyPathApi(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
      // this.$router.push('/employees')
    }
  }
}
</script>
<style scoped></style>
