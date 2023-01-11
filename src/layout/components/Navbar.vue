<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-button type="primary" size="mini" style="width: auto; margin: 8px" @click="dialogVisible = true" >上传文档<i class="el-icon-upload el-icon--right"></i></el-button>
      <el-input v-model="search" placeholder="搜索" size="mini" style="width: auto; margin: 8px">
        <el-button slot="append" icon="el-icon-search" @click="routeToSearch" />
      </el-input>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <div style="display: flex">
            <el-image src="https://s1.ax1x.com/2020/06/13/tvLvWR.png" class="user-avatar" />
            <div class="user-avatar-name">{{ name }}</div>
          </div>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu v-if="name !== '未登录'" slot="dropdown" class="user-dropdown">
          <router-link to="/user/info">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
<!--          <router-link to="/user/developer">-->
<!--            <el-dropdown-item>博主服务</el-dropdown-item>-->
<!--          </router-link>-->
<!--          <router-link to="/user/view">-->
<!--            <el-dropdown-item>用户画像</el-dropdown-item>-->
<!--          </router-link>-->
<!--          <router-link v-if="role === 1" to="/admin/dashboard">-->
<!--            <el-dropdown-item divided>数据总览</el-dropdown-item>-->
<!--          </router-link>-->
<!--          <router-link v-if="role === 1" to="/admin/crawl">-->
<!--            <el-dropdown-item>任务管理</el-dropdown-item>-->
<!--          </router-link>-->
          <router-link v-if="role === 1 || role === 3 " to="/admin/user">
            <el-dropdown-item divided>用户管理</el-dropdown-item>
          </router-link>
          <router-link v-if="role === 1 || role === 3" to="/admin/category">
            <el-dropdown-item>分类管理</el-dropdown-item>
          </router-link>
          <router-link v-if="role === 1 || role === 3" to="/admin/tag">
            <el-dropdown-item>标签管理</el-dropdown-item>
          </router-link>
          <router-link v-if="role === 1 || role === 3" to="/admin/docs">
            <el-dropdown-item>文档管理</el-dropdown-item>
          </router-link>
<!--          <router-link v-if="role === 1" to="/admin/article">-->
<!--            <el-dropdown-item>博文管理</el-dropdown-item>-->
<!--          </router-link>-->
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu v-if="name === '未登录'" slot="dropdown" class="user-dropdown">
          <router-link to="/login">
            <el-dropdown-item>登录</el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
        title="上传文档"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body>
      <div style="margin-left: 60px">
        <span style="margin-left: 50px">     支持Word/Excel/PPT/PDF，不超过100M</span>
        <span >
        <el-upload
            ref="upload"
            style="margin-top: 30px; margin-bottom: 30px "
            class="upload-demo"
            drag
            :action="actionUrl"
            :before-upload="beforeUpload"
            multiple
            :headers="headerObj"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :file-list="fileList"
            :auto-upload="false"
            :limit="1"
            accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,.pptx">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
      <div style="margin-left: 90px">
           <el-button type="primary"  size="small" @click="uploadFile">上 传</el-button>
        <el-button @click="dialogVisible = false"  size="small">取 消</el-button>
      </div>

  </span>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {getBaseUrl} from "@/utils/request";
import { getToken } from '@/utils/auth'
import {logout} from "@/api/user";
export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      search: '',
      dialogVisible: false,
      fileList:[],
      uploadURL :"",
      headerObj: {
        Authorization: getToken()
      },
      actionUrl: getBaseUrl() + "/files/upload",

    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'role'
    ])
  },
  methods: {
    beforeUpload(){
    },
    uploadFile() {
        if(this.headerObj.Authorization === undefined) {
          this.$message.warning("您未登陆，请先登陆");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        } else {
            this.$refs.upload.submit();
        }

    },
    uploadSuccess() {
      this.$message.success("上传文档成功");
      this.dialogVisible = false;
      this.fileList = []
    },
    uploadError() {
      this.$message.error("上传文档失败");
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')

      logout().then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    routeToSearch() {
      this.$router.push({ path: '/blog/search?word=' + this.search })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 100%;
        }
        .user-avatar-name {
          cursor: pointer;
          margin-left: 8px;
          font-size: 15px;
          text-align: center;
          vertical-align: middle;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 18px;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
