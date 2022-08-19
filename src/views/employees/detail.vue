<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane name="account" label="登录账户设置">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="fromData.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="fromData.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onAdd">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane name="user" label="个人详情">
            <userInfo></userInfo>
          </el-tab-pane>
          <el-tab-pane name="tob" label="岗位信息">
            <jobInfo></jobInfo>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import { setUserDatilApi, saveUserDetailById } from '@/api'
import userInfo from './components/user-info.vue'
import jobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  name: '',
  data() {
    return {
      fromData: {},
      activeName: Cookies.get('TabActiveName') || 'account'
    }
  },
  components: {
    userInfo,
    jobInfo
  },
  created() {
    this.loadUserDatil()
  },
  mounted() {},
  computed: {},
  methods: {
    async loadUserDatil() {
      const res = await setUserDatilApi(this.$route.params.id)
      this.fromData = res
    },
    async onAdd() {
      await saveUserDetailById(this.fromData)
      this.$message.success('更新成功')
    },
    //tab栏切换持久化
    handleClick() {
      Cookies.set('TabActiveName', this.activeName)
    }
  }
}
</script>
<style scoped></style>
