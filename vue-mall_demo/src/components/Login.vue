<template>
    <div class="login-container">
      <el-card class="login-card">
        <h3>{{ title }}</h3>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="button-container">
            <el-button @click="goToRegister" class="register-button">注册</el-button>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="text" @click="goToForgotPassword" >忘记密码</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  import axiosInstance from '../api'
  export default {
    name: 'Login',
    data() {
      return {
        title: '登录',
        loginForm: {
          username: '',
          password: '',
        },
        loginRules: {
          username: [{ required: true, message: '用户名为空', trigger: 'blur' }],
          password: [{ required: true, message: '密码为空', trigger: 'blur' }],
        },
      };
    },
    mounted() {
      this.isLogin();
    },
    methods: {
      async login() {
        await this.$refs.loginForm.validate(valid => {
          if (valid) {
            axiosInstance.request({
            method: 'post',
            url: 'users/login',
            data: { 
              username: this.loginForm.username,
              password: this.loginForm.password,
              user_type: 'customer'
             }
          })
            .then(response => {
              // 处理响应数据
              if(response.data.code == '200'){
                window.localStorage.setItem('token', response.data.data.token);
                console.log(window.localStorage.getItem('token'));
                console.log(response);
                console.log(response.data);
                this.$router.push('/');
                this.$notify({
                  title: '登陆成功',
                  message: '欢迎来到在线电子商务平台',
                  type: 'success'
                });
              }
              else
              {
                this.$notify({
                  title: '登录错误',
                  message: '用户名或密码错误',
                  type: 'error'
                });
              }
              
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
          } else {
            console.log('Form validation failed.');
          }
        });
      },
      isLogin() {
        let token = localStorage.getItem('token');
        if(token !== null)
        {
          this.title = '您已登录，无需再次登录';
          this.$notify.info({
          title: '提示',
          message: '您已登录，无需再次登录'
        });
        }
      },
      goToRegister() {
        
        // 跳转到注册页面
        this.$router.push('/register');
      },
      goToForgotPassword() {
        // 跳转到忘记密码页面
        this.$router.push('/forgotPassword');
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-card {
    width: 400px;
    padding: 20px;
  }
  
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .forgot-password-button {
    color: #909399;
  }
  </style>
  