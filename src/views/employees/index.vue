<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            v-if="isHas(point.permissions.import)"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="importExcel"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="isShowAdd"
            v-if="isHas(point.permissions.add)"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card v-loading="loading">
        <el-table :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工" sortable="" prop="username">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/zhuanqq.gif')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                alt=""
                @click="isShowErcodeDailog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatterformOfEmployment"
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="AssignShow(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="onremove(row.id)"
                v-if="isHas(point.permissions.del)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="pages.size"
            :current-page="pages.page"
            :total="total"
            @current-change="changePage"
          />
        </el-row>
        <!-- 角色分配 -->
        <AssignRole
          :EmployessId="EmployessId"
          :visible.sync="AssignVisible"
        ></AssignRole>
      </el-card>
    </div>
    <!-- 新增弹层组件 -->
    <AddEmployees
      @add-success="getEmployees"
      :Visible.sync="isShowAddEmployees"
    ></AddEmployees>
    <!-- 头像二维码 -->
    <el-dialog title="头像二维码" :visible.sync="isShowErcode">
      <canvas id="canvas"></canvas>
    </el-dialog>
  </div>
</template>

<script>
import { getEmployeesApi, delEmployee } from '@/api'
import employees from '@/constant/employees'
import QRCode from 'qrcode'
import AddEmployees from './components/add-Employees.vue'
import AssignRole from './components/assign-role.vue'
import MixinsPermissions from '@/mixins/permissions'
const { exportExcelMapPath, hireType } = employees
export default {
  name: 'Employees',
  mixins: [MixinsPermissions],
  data() {
    return {
      isShowErcode: false,
      loading: false,
      employees: [],
      total: 0,
      pages: {
        page: 1,
        size: 5
      },
      isShowAddEmployees: false,
      AssignVisible: false, //分配角色
      EmployessId: '' // 传给分配角色的id
    }
  },
  components: { AddEmployees, AssignRole },
  created() {
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      this.loading = true
      const { rows, total } = await getEmployeesApi(this.pages)
      this.employees = rows
      this.total = total
      this.loading = false
    },
    changePage(val) {
      this.pages.page = val
      this.getEmployees()
    },
    //格式化聘用形式
    formatterformOfEmployment(row, column, cellValue, index) {
      // if(cellValue===1) return '正式'
      // if(cellValue===2) return '非正式'
      // return '未知'
      const FindeItem = employees.hireType.find((item) => item.id === cellValue)
      return FindeItem ? FindeItem.value : '未知'
    },
    async onremove(id) {
      await this.$confirm('是否删除该员工')
      await delEmployee(id)
      this.$message.success('删除成功')
    },
    isShowAdd() {
      this.isShowAddEmployees = true
    },
    //导出excwl
    async importExcel() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find(
              (hire) => hire.id === item[exportExcelMapPath[h]]
            )
            return findItem ? findItem.value : '未知'
          }
          return item[exportExcelMapPath[h]]
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    },
    //显示二维码
    isShowErcodeDailog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户还未设置头像')
      this.isShowErcode = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRCode.toCanvas(canvas, staffPhoto)
      })
    },
    //显示分配角色
    AssignShow(id) {
      this.AssignVisible = true
      this.EmployessId = id
    }
  }
}
</script>

<style scoped lang="less"></style>
