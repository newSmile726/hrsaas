<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :isShowLeft="false">
        <template slot="right">
          <el-button type="primary" @click="showDialogFn('0', 1)"
            >新增权限</el-button
          >
        </template>
      </page-tools>
      <!-- 表格区域 -->
      <el-table
        border
        :data="permissions"
        style="width: 100%"
        class="table-per"
        row-key="id"
        ref="table"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="名称">
          <template v-slot="{ row }">
            <i
              v-if="row.children"
              class="el-icon-folder-opened"
              style="margin-right: 5px"
              @click="queryopen(row)"
            ></i>
            <i
              v-if="row.type === 2"
              class="el-icon-folder"
              style="margin-right: 5px"
            ></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="showDialogFn(row.id, 2)"
              >添加</el-button
            ><el-button type="text">编辑</el-button
            ><el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增权限弹层 -->
    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog :title="`新增权限点`" :visible.sync="showDialog">
      <!-- 表单 -->
      <el-form
        ref="perForm"
        :model="formData"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          <el-button size="small" @click="btnCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionList, addPermission } from '@/api'
import { troneSlistToTree } from '@/utils'
export default {
  name: 'permissions',
  data() {
    return {
      permissions: [],
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      },
      showDialog: false
    }
  },

  created() {
    this.getPermission()
  },

  methods: {
    //获取权限列表
    async getPermission() {
      const res = await getPermissionList()
      this.permissions = troneSlistToTree(res, '0')
    },
    //点击树形数据展开
    queryopen(row) {
      row.isExpnt = !row.isExpnt
      this.$refs.table.toggleRowExpansion(row, row.isExpnt)
    },
    // 关闭弹层
    btnCancel() {
      this.showDialog = false
    },
    //打开新增弹层
    showDialogFn(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    //确定添加
    async btnOK() {
      this.$refs.perForm.validate()
      await addPermission(this.formData)
      this.$message.success('添加成功')
      this.btnCancel()
      this.getPermission()
    }
  }
}
</script>

<style scoped lang="scss">
.table-per {
  margin-top: 20px;
}
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
