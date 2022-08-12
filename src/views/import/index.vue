<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel :beforeUpload="uploadSucees" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Import',
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    uploadSucees() {
      const maxSize = false
      if (maxSize) {
        return false
      }
      console.log('继续上传')
    }
  }
}
</script>
<style scoped></style>
