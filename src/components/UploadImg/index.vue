<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="图片上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      action="#"
      list-type="picture-card"
      :http-request="httpRequest"
      :limit="1"
      class="inputW-upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="ShowImgDialog">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDA8qJVR6TbS2MVQ5TbDYcPvA8pFOGrBE0',
  SecretKey: 'WlkTv60dy2qNcaHiskMinb8PUIp54mDM'
})
export default {
  name: 'UploadImg',
  data() {
    return {
      //AKIDA8qJVR6TbS2MVQ5TbDYcPvA8pFOGrBE0   id
      //WlkTv60dy2qNcaHiskMinb8PUIp54mDM       key
      fileList: [],
      ShowImgDialog: false,
      dialogImageUrl: '',
      loading: false
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    httpRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'smile-1313341606' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
        }
      )
    },
    //覆盖默认上传
    onChange(file, fileList) {
      this.fileList = fileList
    },
    //删除图片
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    //预览
    onPreview(file) {
      this.ShowImgDialog = true
      this.dialogImageUrl = file.url
    },
    //上传前
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不能超过2MB')
        return false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.inputW-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
