<template>
  <div class="app-container" style="margin-left: 8%; width: 84%">
    <el-row>
      <el-col :span="6" style="margin: 8px">
        <el-input v-model="searchItem" placeholder="请输入内容" size="small">
          <el-button slot="append" size="small" icon="el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="4" style="margin: 8px">
        <el-button type="plain" size="small" icon="el-icon-plus" @click="addUser">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      border
      fit
      highlight-current-row
      style="text-align: center"
    >
      <el-table-column align="center" label="id" width="120%" sortable prop="id" />
      <el-table-column align="center" label="用户名" width="150%" prop="name" />
      <el-table-column align="center" label="用户角色" width="120%">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role === 0" type="info">普通用户</el-tag>
          <el-tag v-if="scope.row.role === 1" type="primary">管理员</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" prop="email" />
      <el-table-column align="center" label="手机" width="120%" prop="mobile" />
      <el-table-column align="center" label="性别" width="120%" prop="sex" />
      <el-table-column align="center" label="年龄" width="120%" prop="age" />
      <el-table-column align="center" label="职业" width="120%" prop="job" />
      <el-table-column align="center" label="学校" width="120%" prop="school" />
      <el-table-column align="center" label="选项" width="120%">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="userCount" :current-page.sync="currentPage" background layout="prev, pager, next" style="float: right; margin: 8px" @current-change="handleCurrentChange" />
    <el-dialog :visible.sync="registerFormVisible" title="添加用户">
      <el-form label-width="80px" style="margin: 8px">
        <el-form-item label="用户名"><el-input v-model="addUserInfo.username" placeholder="请输入用户名" /></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="addUserInfo.email" placeholder="请输入邮箱" /></el-form-item>
        <el-form-item label="密码"><el-input v-model="addUserInfo.password" type="password" placeholder="请输入密码" /></el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button @click="registerFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmAddUser">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible" title="编辑用户">
      <el-form v-model="userInfo" label-width="80px" style="margin: 8px">
        <el-form-item label="用户id" style="text-align: left">{{ userInfo.id }}</el-form-item>
        <el-form-item label="用户名"><el-input v-model="userInfo.name" placeholder="请输入用户名：张三" /></el-form-item>
        <el-form-item label="用户角色"><el-input v-model="userInfo.role" placeholder="用户角色：0-普通用户/1-管理员" /></el-form-item>
        <!--<el-form-item label="密码"><el-input v-model="userInfo.password" placeholder="请输入密码" /></el-form-item>-->
        <el-form-item label="邮箱"><el-input v-model="userInfo.email" placeholder="请输入邮箱：xx@xx.xx" /></el-form-item>
        <el-form-item label="手机"><el-input v-model="userInfo.mobile" placeholder="请输入手机：13123456789" /></el-form-item>
        <el-form-item label="性别"><el-input v-model="userInfo.sex" placeholder="请输入性别：男/女" /></el-form-item>
        <el-form-item label="年龄"><el-input v-model="userInfo.age" placeholder="请输入年龄：20" /></el-form-item>
        <el-form-item label="职业"><el-input v-model="userInfo.job" placeholder="请输入职业：程序员" /></el-form-item>
        <el-form-item label="学校"><el-input v-model="userInfo.school" placeholder="请输入学校：如山东大学" /></el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { register } from '@/api/user'
import { adminDelUser, adminGetUserCount, adminGetUserLists, adminUpdateUserInfo } from '@/api/admin'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      registerFormVisible: false,
      currentPage: 1,
      userCount: 10,
      searchItem: '',
      addUserInfo: { name: '', email: '', password: '' },
      userInfo: { id: 0, name: '', role: 0, email: '', mobile: '', sex: '', age: 0, job: '', school: '' }
    }
  },
  created() {
    this.handleCurrentChange()
  },
  methods: {
    handleCurrentChange() {
      var that = this
      that.listLoading = true
      adminGetUserCount().then(response => {
        const { data } = response
        that.userCount = data
        adminGetUserLists(that.currentPage, 10).then(response => {
          const { data } = response
          that.list = data
          that.listLoading = false
        })
      })
    },
    addUser() {
      this.registerFormVisible = true
    },
    confirmAddUser() {
      var that = this
      register(that.addUserInfo).then(response => {
        that.addUserInfo = { name: '', email: '', password: '' }
        that.registerFormVisible = false
        that.handleCurrentChange()
      }).catch(error => {
        console.log(error)
      })
    },
    edit(res) {
      this.dialogFormVisible = true
      this.userInfo = res
    },
    del(res) {
      this.userInfo = res
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmDel()
      })
    },
    confirmEdit() {
      var that = this
      adminUpdateUserInfo(that.userInfo.id, that.userInfo).then(response => {
        that.dialogFormVisible = false
        that.handleCurrentChange()
      }).catch(error => {
        console.log(error)
      })
    },
    confirmDel() {
      var that = this
      adminDelUser(that.userInfo.id).then(response => {
        that.dialogFormVisible = false
        that.handleCurrentChange()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
