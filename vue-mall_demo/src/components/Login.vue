<template>
    <div class="login-container">
      <el-card class="login-card">
        <h3>登录</h3>
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
  export default {
    name: 'Login',
    data() {
      return {
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
    methods: {
      login() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // 执行登录逻辑，例如发送请求到服务器验证用户信息
            // 成功登录后，可以跳转到其他页面
            this.$router.push('/');
          } else {
            console.log('Form validation failed.');
          }
        });
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
  