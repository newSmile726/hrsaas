<template>
  <div>
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select @change="updateCalendar" v-model="currentYears">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select @change="updateCalendar" v-model="currentMath">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
export default {
  name: 'calendar',
  data() {
    return {
      currentYears: '', // 选择年
      years: [],
      currentMath: '',
      currentDate: ''
    }
  },
  created() {
    this.initCanlendar()
  },
  mounted() {},
  computed: {},
  methods: {
    // 初始化日历
    initCanlendar() {
      const date = new Date()
      this.currentYears = date.getFullYear()
      this.currentMath = date.getMonth() + 1
      this.years = Array(11)
        .fill(this.currentYears - 5)
        .map((item, index) => item + index)
      this.currentDate = date
    },
    // 判断是否是 休息
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    //更新日历
    updateCalendar() {
      this.currentDate = this.currentYears + '-' + this.currentMath
    }
  }
}
</script>
<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none !important;
  }
  .cell-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    span {
      color: #fff;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      background-color: #fa7c4d;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
}
</style>
