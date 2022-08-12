<template>
  <el-dialog title="新增员工" :visible="Visible" width="50%" @close="onClose">
    <!-- 表单 -->
    <el-form :model="formData" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width: 50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请选择部门"
        /> -->
        <el-select
          v-model="formData.departmentName"
          placeholder="请选择"
          style="width: 50%"
          @focus="getDepts"
          ref="treeSelect"
        >
          <el-option class="treeOption" value="" v-loading="isTreeloading">
            <el-tree
              @node-click="treeNodeCilck"
              :data="depts"
              :props="treeNodeProps"
            ></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请选择日期"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onsever">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import employees from '@/constant/employees'
import { getDeptsApi, addEmployee } from '@/api'
import { troneSlistToTree } from '@/utils'
export default {
  name: 'AddEmployees',
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'change' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      hireType: employees.hireType,
      depts: [],
      treeNodeProps: {
        label: 'name'
      },
      isTreeloading: false
    }
  },
  props: {
    Visible: {
      type: Boolean,
      required: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {}
    },
    async getDepts() {
      this.isTreeloading = true
      const { depts } = await getDeptsApi()
      troneSlistToTree(depts, '')
      this.depts = depts
      this.isTreeloading = false
    },
    treeNodeCilck(row) {
      this.formData.departmentName = row.name
      this.$refs.treeSelect.blur()
    },
    onsever() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addEmployee(this.formData)
        this.$message.success('添加成功')
        this.onClose()
        this.$emit('add-success')
      })
    }
  }
}
</script>
<style scoped lang="scss">
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
  overflow: unset;
}
.treeOption {
  height: 100px;
}
</style>
