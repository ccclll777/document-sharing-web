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
      <el-table-column align="center" label="用户名" width="150%" prop="userName" />
      <el-table-column align="center" label="用户角色" width="120%">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role === 2" type="primary">普通用户</el-tag>
          <el-tag v-if="scope.row.role === 4" type="primary">临时用户</el-tag>
          <el-tag v-if="scope.row.role === 1" type="primary">超级管理员</el-tag>
          <el-tag v-if="scope.row.role === 3" type="primary">管理员</el-tag>
<!--          <el-tag  type="primary">{{scope.row.roleName}}</el-tag>-->
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称" width="120%" prop="nickName" />
      <el-table-column align="center" label="邮箱" prop="email" />
      <el-table-column align="center" label="手机" width="120%" prop="phone" />
      <el-table-column align="center" label="用户状态" width="120%">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" type="info">已删除</el-tag>
          <el-tag v-if="scope.row.status === 1" type="primary">正常</el-tag>
          <el-tag v-if="scope.row.status === 2" type="info">已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          label="创建时间"
          align="center"
          width="189"
      >

        <template slot-scope="scope">{{ scope.row.CreatedAt }}</template>
      </el-table-column>
      <el-table-column
          label="更新时间"
          align="center"
          width="189"
      >

        <template slot-scope="scope">{{ scope.row.UpdatedAt}}</template>
      </el-table-column>
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
        <el-form-item label="用户名"><el-input v-model="addUserInfo.userName" placeholder="请输入用户名" /></el-form-item>
<!--        <el-form-item label="邮箱"><el-input v-model="addUserInfo.email" placeholder="请输入邮箱" /></el-form-item>-->
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
        <el-form-item label="用户昵称" style="width: 500px"><el-input v-model="userInfo.nickName" placeholder="请输入昵称：张三" /></el-form-item>
<!--        <el-form-item label="用户角色" style="width: 500px"><el-input v-model="userInfo.role" placeholder="用户角色：2-普通用户/3-管理员/" /></el-form-item>-->
        <el-form-item label="用户角色" style="width: 500px;text-align: left">
          <el-select v-model="optionRoleName" placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled">
          </el-option>
        </el-select></el-form-item>
        <!--<el-form-item label="密码"><el-input v-model="userInfo.password" placeholder="请输入密码" /></el-form-item>-->
        <el-form-item label="邮箱" style="width: 500px"><el-input v-model="userInfo.email" placeholder="请输入邮箱：xx@xx.xx" /></el-form-item>
        <el-form-item label="手机" style="width: 500px"><el-input v-model="userInfo.mobile" placeholder="请输入手机：13123456789" /></el-form-item>

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
import { getUserCount,getUserList,deleteUser,updateUserInfo,updateUserRole } from '@/api/user'

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
      userInfo: { id: 0, name: '', role: 0, email: '', phone: '' },
      options: [{
        value: '1',
        label: '超级管理员',
        disabled: true
      }, {
        value: '2',
        label: '普通用户',

      }, {
        value: '3',
        label: '管理者'
      }],
      optionRoleName:""
    }
  },
  created() {
    this.handleCurrentChange()
  },
  methods: {
    handleCurrentChange() {
      this.listLoading = true
      getUserCount().then(response => {
        const { data } = response
        this.userCount = data
        getUserList(this.currentPage, 10).then(response => {
          const { data } = response
          this.list = data
          for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].role === 1) {
              this.list[i].roleName = "超级管理员"
            } else if (this.list[i].role === 2) {
              this.list[i].roleName = "普通用户"
            }else if (this.list[i].role === 3) {
              this.list[i].roleName = "管理者"
            }else if (this.list[i].role === 4){
              this.list[i].roleName = "临时用户"
            }
            var date = new Date(Date.parse(this.list[i].createTime))
            this.list[i].CreatedAt = date.toLocaleString('chinese', { hour12: false })
            var UpdateDate = new Date(Date.parse(this.list[i].updateTime))
            this.list[i].UpdatedAt = UpdateDate.toLocaleString('chinese', { hour12: false })
          }
          this.listLoading = false
        })
      })
    },
    addUser() {
      this.registerFormVisible = true
    },
    confirmAddUser() {
      register(this.addUserInfo).then(response => {
        this.addUserInfo = { userName: '', password: '' }
        this.registerFormVisible = false
        this.handleCurrentChange()
      }).catch(error => {
        console.log(error)
      })
    },
    edit(res) {
      this.dialogFormVisible = true
      this.optionRoleName = "超级管理员"
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
      const params = {id:this.userInfo.id,nickName:this.userInfo.nickName,phone:this.userInfo.phone,email:this.userInfo.email}
      updateUserInfo(params).then(response => {
        if (response.code === 200) {

          if (this.userInfo.role !== this.optionRoleName) {
            var params2 = {userId:this.userInfo.id, roleId:this.optionRoleName}
            updateUserRole(params2).then(response2 => {
              if  (response2.code === 200) {
                this.handleCurrentChange()
                this.$message.success("修改成功")
                this.dialogFormVisible = false
              } else {
                this.$message.error("错误：" + response.message)
              }
            }).catch(error => {
              console.log(error)
            })
          }
        } else {
          this.$message.error("错误：" + response.message)
        }
      }).catch(error => {
        console.log(error)
      })

      console.log(this.optionRoleName)
    },
    confirmDel() {
      deleteUser(this.userInfo.id).then(response => {
        if (response.code === 200) {
          this.dialogFormVisible = false
          this.handleCurrentChange()
        } else {
          this.$message.error("错误：" + response.message)
        }
      }).catch(error => {
        this.$message.error("错误：" + error)
      })
    }
  }
}
</script>
