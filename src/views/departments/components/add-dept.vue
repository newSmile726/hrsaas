<template>
  <el-dialog
    title="新增部门"
    :visible.sync="visible"
    width="50%"
    :before-close="handleClose"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    visible: {
      type: Boolean,
      requirted: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {}
}
</script>
<style scoped></style>
