<template>
  <el-dialog @close="onclose" title="新增部门" :visible="visible" width="50%">
    <el-form
      ref="form"
      label-width="100px"
      :model="formData"
      :rules="formDataRules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          placeholder="请输入部门编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 100%"
          placeholder="请选择负责人"
        >
          <el-option
            v-for="item in employees"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          type="textarea"
          placeholder="请输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button @click="oncave" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getDeptsApi, getEmployeesListApi, AddDeptsApi } from '@/api'
export default {
  name: '',
  data() {
    // 自定义部门名称校验规则
    const checkName = (rule, value, callback) => {
      // console.log(this.currentNode)
      const isRepat = this.currentNode.children?.some(
        (item) => item.name === value
      ) //返回一个布尔值 为true表示存在 false表示没有
      isRepat ? callback(new Error('部门重复')) : callback()
    }
    //自定义部门编码校验规则
    const checkCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      const isRepat = depts.some((item) => item.code === value)
      //返回一个布尔值 为true表示存在 false表示没有
      isRepat ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formDataRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          {
            validator: checkName,
            trigger: 'blur'
          }
        ],
        code: [
          { required: true, message: '请输入部门编码', trigger: 'blur' },
          {
            validator: checkCode,
            trigger: 'blur'
          }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      },
      employees: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      requirted: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getEmployeesList()
  },
  mounted() {},
  computed: {},
  methods: {
    //获取部门负责人列表
    async getEmployeesList() {
      const res = await getEmployeesListApi()
      // console.log(res)
      this.employees = res
    },
    //关闭弹层
    onclose() {
      this.$emit('update:visible', false)
    },
    //新增部门
    async oncave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      try {
        await AddDeptsApi(this.formData)
        this.onclose()
        this.$message.success('添加部门成功')
        this.$emit('addSuscess')
        console.log(this.formData)
      } catch (error) {
        this.$message.error('添加部门失败')
      }
    }
  }
}
</script>
<style scoped></style>
