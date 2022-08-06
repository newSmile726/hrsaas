<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <!-- 头部 -->
        <treeTools
          @add="addDeptShow"
          :isRouled="true"
          :treeNode="compny"
        ></treeTools>
        <!-- 树形控件 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="scope">
            <treeTools
              @add="addDeptShow"
              :treeNode="scope.data"
              @remove="getDepts"
            ></treeTools>
          </template>
        </el-tree>
      </el-card>
      <!-- 新增弹层 -->
      <AddDept @addSuscess='getDepts' :visible.sync="dialogVisible" :currentNode="currentNode"></AddDept>
    </div>
  </div>
</template>

<script>
import treeTools from './components/treeTools.vue'
import { getDeptsApi } from '@/api'
import { troneSlistToTree } from '@/utils' //调用处理树形数据的方法
import AddDept from './components/add-dept.vue'
export default {
  components: { treeTools, AddDept },
  data() {
    return {
      treeData: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹丕' }]
        },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }
      ],
      defaultProps: {
        label: 'name'
      },
      compny: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currentNode: {}
    }
  },

  created() {
    this.getDepts()
  },

  methods: {
    async getDepts() {
      const res = await getDeptsApi()
      this.treeData = troneSlistToTree(res.depts, '') //父级id为 ''
    },
    addDeptShow(val) {
      this.dialogVisible = true
      this.currentNode = val
    }
  }
}
</script>

<style scoped lang="less"></style>
