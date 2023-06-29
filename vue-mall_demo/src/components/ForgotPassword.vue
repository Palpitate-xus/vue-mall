<template>
    <div class="forgot-password-container">
      <el-card class="forgot-password-card">
        <h3>忘记密码</h3>
        <el-form ref="forgotPasswordForm" :model="forgotPasswordForm" :rules="forgotPasswordRules" label-width="80px">
          <el-form-item label="Email" prop="email">
            <el-input v-model="forgotPasswordForm.email" placeholder="输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item class="button-container">
            <el-button type="primary" @click="resetPassword">重置密码</el-button>
            <el-button @click="goToLogin">登陆</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ForgotPassword',
    data() {
      return {
        forgotPasswordForm: {
          email: '',
        },
        forgotPasswordRules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      resetPassword() {
        this.$refs.forgotPasswordForm.validate(valid => {
          if (valid) {
            // 执行重置密码逻辑，例如发送请求到服务器重置密码
            // 重置密码成功后，可以提示用户并跳转到登录页面
            this.$message.success('密码重置邮件已发送至邮箱');
            this.$router.push('/login');
          } else {
            console.log('Form validation failed.');
          }
        });
      },
      goToLogin() {
        // 跳转到登录页面
        this.$router.push('/login');
      },
    },
  };
  </script>
  
  <style scoped>
  .forgot-password-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .forgot-password-card {
    width: 400px;
    padding: 20px;
  }
  
  .button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  </style>
  