<template>
    <div class="forgot-password-container">
      <el-card class="forgot-password-card">
        <h3>忘记密码</h3>
        <el-form ref="forgotPasswordForm" :model="forgotPasswordForm" :rules="forgotPasswordRules" label-width="80px">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="forgotPasswordForm.email" placeholder="输入邮箱地址"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row>
              <el-row>
                <el-col :span="12">
                  <el-input v-model="forgotPasswordForm.code" placeholder="输入验证码"></el-input>
                </el-col>
                <el-col :span="12">
                  <el-button type="primary" @click="sendCode">发送验证码</el-button>
                </el-col>
              </el-row>
            </el-row>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="forgotPasswordForm.newPassword" placeholder="输入新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmNewPassword">
            <el-input type="password" v-model="forgotPasswordForm.confirmNewPassword" placeholder="确认新密码"></el-input>
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
  import axiosInstance from '../api';
  export default {
    name: 'ForgotPassword',
    data() {
      return {
        forgotPasswordForm: {
          email: '',
          newPassword: '',
          confirmNewPassword: '',
          code: '',
        },
        forgotPasswordRules: {
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          newPassword: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 6, message: '密码至少6位', trigger: 'blur' },
          ],
          confirmNewPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: this.validatePasswordConfirmation, trigger: 'blur' },
          ],
        },
      };
    },
    methods: {
      async resetPassword() {
        await this.$refs.forgotPasswordForm.validate(valid => {
          if (valid) {
            // 执行重置密码逻辑，发送请求到服务器重置密码
            // 重置密码成功后，可以提示用户并跳转到登录页面
            if(this.forgotPasswordForm.code === '6666'){
              axiosInstance.request({
              method: 'post',
              url: 'users/reset_password',
              data: { 
                password: this.forgotPasswordForm.newPassword,
                email: this.forgotPasswordForm.email,
              }
            })
              .then(response => {
                // 处理响应数据
                // window.localStorage.setItem('token', response.data.data.token);
                window.localStorage.removeItem('token');
                console.log(response);
                console.log(response.data);
                this.$router.push('/login');
                this.$notify({
                  title: '重置密码成功',
                  message: '您已重置密码',
                  type: 'success'
                });
              })
              .catch(error => {
                // 处理错误
                console.error(error);
              });
            }
          } else {
            console.log('Form validation failed.');
          }
        });
      },
      goToLogin() {
        // 跳转到登录页面
        this.$router.push('/login');
      },
      sendCode() {
        this.$message('当前无邮件服务器，验证码填6666即可')
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
  