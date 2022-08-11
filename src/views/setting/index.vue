<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="adddialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button size="small" type="primary">分配权限</el-button>
                <el-button size="small" type="success">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[2, 5, 10, 20]"
            :page-size="pagesize"
            layout="sizes,prev, pager, next"
            :total="total"
          >
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </div>
    <!-- 新增弹层 -->
    <el-dialog title="新增角色" :visible.sync="adddialogVisible" width="50%">
      <el-form
        @close="onFormClose"
        label-width="80px"
        :model="addRolesForm"
        :rules="addRolesFormRules"
        ref="form"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRolesForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addRolesForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onclose">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, AddRolesApi } from '@/api'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 5,
      page: 1,
      adddialogVisible: false,
      addRolesForm: {
        name: '',
        description: ''
      },
      addRolesFormRules: {
        name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getRoles()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = rows
      this.total = total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    onclose() {
      this.adddialogVisible = false
    },
    async addRole() {
      await this.$refs.form.validate()
      await AddRolesApi(this.addRolesForm)
      this.$message.success('添加成功')
      this.adddialogVisible = false
      this.onFormClose()
      this.getRoles()
    },
    //监听表单关闭
    onFormClose() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped lang="less"></style>
