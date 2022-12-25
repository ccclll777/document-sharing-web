<template>
  <div style="margin: 8px 8px 8px 9%;">
    <el-col :span="12" style="margin: 8px">
      <tip-item name="基本信息" />
      <el-row>
        <el-image class="avatar" src="https://s1.ax1x.com/2020/06/13/tvLvWR.png" style="width: 80px; height: 80px; float: left; margin-right: 16px" />
        <el-form :model="userInfo" label-position="left">
          <el-form-item label="用户名" style="height: 40px">
            <span>{{ userInfo.userName }}（id：{{ userInfo.id }}）</span>
          </el-form-item>
          <el-form-item label="用户角色" style="height: 40px">
            <span v-if="userInfo.role===2">普通用户</span>
            <span v-if="userInfo.role===1">超级管理员</span>
            <span v-if="userInfo.role===3">普通管理员</span>
          </el-form-item>
        </el-form>
      </el-row>
      <tip-item name="详细信息" />
      <el-form :model="userInfo" label-width="64px" style="margin: 8px">
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email" class="info-input" type="text" placeholder="请输入电子邮箱：如xx@xx.xx" />
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="userInfo.phone" class="info-input" type="text" placeholder="请输入手机号：如13123456789" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userInfo.nickName" class="info-input" type="text" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-check" style="float: right" @click="updateInfo">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-col>
<!--    <el-col :span="8" style="margin: 8px">-->
<!--      <tip-item name="我的足迹" />-->
<!--      <div v-for="item in hisList" :key="item.id">-->
<!--        <blog-brief-item :id="item.id" :title="item.title" :author="item.author" :date="item.updateTime" />-->
<!--      </div>-->
<!--    </el-col>-->
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import { getDetailInfo } from '@/api/user'
import { updateUserInfo } from '@/api/user'
// import { getUserHistoryList } from '@/api/user'
// import BlogBriefItem from '@/views/components/blog-brief-item'

export default {
  components: {  TipItem },
  data() {
    return {
      userInfo: { id: 0, userName: '', role: 0, email: '', phone: '13123456789', nickName: '' },
      hisList: []
    }
  },
  created() {
    this.fetchInfo()
    // this.fetchHistory()
  },
  methods: {
    fetchInfo() {
      var that = this
      getDetailInfo().then(response => {
        const { data } = response
        that.userInfo.id = data.id
        that.userInfo.userName = data.userName
        that.userInfo.role = data.role
        that.userInfo.email = data.email
        that.userInfo.phone = data.phone
        that.userInfo.nickName = data.nickName
      }).catch(error => {
        console.log(error)
      })
    },
    updateInfo() {
      this.userInfo
      const params = {id:this.userInfo.id,userName:this.userInfo.userName,nickName:this.userInfo.nickName,phone:this.userInfo.phone,email:this.userInfo.email}
      updateUserInfo(params).then(response => {
        console.log(response.data)
        this.fetchInfo()
      }).catch(error => {
        console.log(error)
      })
    },
    // fetchHistory() {
    //   var that = this
    //   getUserHistoryList(1, 10).then(response => {
    //     const { data } = response
    //     that.hisList = data
    //   })
    // }
  }
}
</script>

<style scoped>
.avatar {
  width: 80px;
  height: 80px;
  margin: 8px;
  border-radius: 100%;
}
</style>
