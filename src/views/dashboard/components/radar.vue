<template>
  <div id="main">雷达图</div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: '',
  data() {
    return {}
  },
  created() {},
  mounted() {
    this.initRadar()
  },
  computed: {},
  methods: {
    initRadar() {
      var myChart = echarts.init(document.getElementById('main'))
      const option = {
        title: {
          text: '人员绩效表'
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 100 },
            { name: '技术', max: 100 },
            { name: '管理', max: 100 },
            { name: '分享', max: 100 },
            { name: 'bug', max: 100 },
            { name: '助人', max: 100 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [70, 80, 60, 70, 80, 70],
                name: '张三'
              },
              {
                value: [50, 40, 68, 76, 62, 21],
                name: '李四'
              }
            ]
          }
        ]
      }
      // 绘制图表
      myChart.setOption(option)
    }
  }
}
</script>
<style scoped lang="scss">
#main {
  width: 700px;
  height: 500px;
}
</style>
