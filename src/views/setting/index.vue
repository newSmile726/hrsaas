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
                <el-button size="small" type="success" @click="ShowRightsdialog"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
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
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form label-width="120px" style="margin-top: 50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width: 400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="formData.companyAddress"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input
                v-model="formData.mailbox"
                disabled
                style="width: 400px"
              />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="formData.remarks"
                type="textarea"
                :rows="3"
                disabled
                style="width: 400px"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
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
    <!-- 分配权限弹层 -->
    <el-dialog title="分配权限" :visible.sync="Rightsdialog" width="50%">
      <el-tree
        show-checkbox
        default-expand-all
        node-key='id'
        :data="Permission"
        :props="{ label: 'name' }"
        :default-checked-keys="defaultcheckedkeys"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="Rightsdialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRolesApi,
  AddRolesApi,
  getCompanyInfoApi,
  getPermissionList
} from '@/api'
import { troneSlistToTree } from '@/utils'
export default {
  name: 'settings',
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
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      formData: {},
      Rightsdialog: false, //权限分配
      Permission: [], //权限列表
      defaultcheckedkeys: ['1'] // 权限默认勾选的节点的 key 的数组
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.PermissionList() // 权限列表
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
    },
    //获取公司信息
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.usrInfo.companyId
      )
      // console.log(res)
      this.formData = {
        name: res.name,
        companyAddress: res.companyAddress,
        mailbox: res.mailbox,
        remarks: res.remarks
      }
    },
    //点击分配权限
    ShowRightsdialog() {
      this.Rightsdialog = true
    },
    //获取权限列表
    async PermissionList() {
      const res = await getPermissionList()
      const treepmission = troneSlistToTree(res, '0')
      this.Permission = treepmission
    }
  }
}
</script>

<style scoped lang="less"></style>
