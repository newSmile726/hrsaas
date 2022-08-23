<template>
  <el-dialog
    title="分配角色"
    :visible="visible"
    @open="onOpen"
    @close="onclose"
  >
    <el-checkbox-group v-model="checkList">
      <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onclose">取 消</el-button>
      <el-button type="primary" @click="assignRoles">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getRolesApi, setUserDatilApi, assignRolesApi } from '@/api'
export default {
  name: 'AssignRole',
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    EmployessId: {
      type: String,
      required: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    onclose() {
      this.$emit('update:visible', false)
    },
    // 获取角色列表
    async getRolesList() {
      const roles = await getRolesApi()
      this.roles = roles.rows
    },
    //监听对话框打开
    onOpen() {
      this.getRolesList()
      this.setUserDatil()
    },
    //获取角色已有的权限
    async setUserDatil() {
      const { roleIds } = await setUserDatilApi(this.EmployessId)
      this.checkList = roleIds
    },
    //分配角色
    async assignRoles() {
      if (!this.checkList.length) return this.$message.error('请选择角色')
      await assignRolesApi({
        id: this.EmployessId,
        roleIds: this.checkList
      })
      this.$message.success('分配成功')
      this.onclose()
    }
  }
}
</script>
<style scoped></style>
