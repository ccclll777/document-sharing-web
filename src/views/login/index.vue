<template>
  <div>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
          <h3 class="title">All-Docs 文档收录分享系统</h3>
        </div>
        <el-form-item prop="username">
          <span class="svg-container"><svg-icon icon-class="user" /></span>
          <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" auto-complete="on" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container"><svg-icon icon-class="password" /></span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd"><svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /></span>
        </el-form-item>
        <el-row>
          <el-button :loading="loading" style="width:48%; margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
          <el-button type="primary" style="width:48%; margin-bottom:30px;" @click.native.prevent="openRegister">注册</el-button>
        </el-row>
      </el-form>
    </div>
    <el-dialog :visible.sync="registerVis" title="注册新用户">
      <el-form label-width="100px" :model="registerForm" style="margin: 8px">
        <el-form-item label="用户名"><el-input v-model="registerForm.username" placeholder="请输入用户名：如hello" type="text" /></el-form-item>
        <el-form-item label="邮箱"><el-input v-model="registerForm.email" placeholder="请输入邮箱：如xx@xx.xx" type="text" /></el-form-item>
        <el-form-item label="密码"><el-input v-model="registerForm.password" type="password" placeholder="请输入密码" /></el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button @click="registerVis = false">返回</el-button>
            <el-button type="primary" @click="handleRegister">注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { register } from '@/api/user'
export default {
  name: 'Login',
  data() {
    return {
      tagCheck: [],
      tagList: [],
      loginForm: {},
      registerForm: {},
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      registerVis: false
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    openRegister() {
      this.registerVis = true
    },
    handleRegister() {
      var that = this
      return new Promise((resolve, reject) => {
        register(that.registerForm).then(response => {
          const { data } = response
          that.registerVis = false
          that.loginForm.username = data.name
          that.loginForm.password = that.registerForm.password
          that.registerForm = {}
          that.$store.dispatch('user/login', this.loginForm).then(() => {
            that.$router.push({ path: this.redirect || '/' })
            that.loading = false
          }).catch(() => {
            that.loading = false
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #fcfcfc;
$light_gray:#222222;
$cursor: #222222;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid #d3dce6;
    background: #fcfcfc;
    border-radius: 10px;
    color: #222222;
  }
}
</style>

<style lang="scss" scoped>
$bg:#fcfcfc;
$bg:#fcfcfc;
$dark_gray: #4080ff;
$light_gray:#222222;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #222222;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
