<template>
  <div class="profile">
    <h2>个人中心</h2>
    <div class="profile-info">
      <div class="info-item">
        <span class="label">用户名:</span>
        <span class="value">{{ user.username }}</span>
      </div>
      <div class="info-item">
        <span class="label">邮箱:</span>
        <span class="value">{{ user.email }}</span>
      </div>
      <div class="info-item">
        <span class="label">注册时间:</span>
        <span class="value">{{ user.registration_date }}</span>
      </div>
      <div class="info-item">
        <span class="label">最后登录时间:</span>
        <span class="value">{{ user.last_login_date }}</span>
      </div>
      <el-button @click="openChangePasswordDialog" type="primary">修改密码</el-button>
      <el-button @click="openEditProfileDialog" type="success">修改个人信息</el-button>
    </div>
    <!-- 修改密码对话框 -->
    <el-dialog :visible.sync="changePasswordDialogVisible" title="修改密码">
      <!-- 修改密码表单内容 -->
      <el-form ref="passwordForm" :model="passwordData" :rules="passwordRules" label-width="120px">
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="passwordData.newPassword"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="passwordData.confirmPassword"></el-input>
      </el-form-item>
    </el-form>
      <!-- 确认和取消按钮 -->
      <div slot="footer">
        <el-button @click="updatePassword" type="primary">确认</el-button>
        <el-button @click="closeChangePasswordDialog">取消</el-button>
      </div>
    </el-dialog>

    <!-- 修改个人信息对话框 -->
    <el-dialog :visible.sync="editProfileDialogVisible" title="修改个人信息">
      <!-- 修改个人信息表单内容 -->
      <el-form :rules="registerRules" :model="editProfileForm">
        <!-- 表单项 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editProfileForm.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editProfileForm.email"></el-input>
        </el-form-item>
      </el-form>

      <!-- 确认和取消按钮 -->
      <div slot="footer">
        <el-button @click="editProfile" type="primary">确认</el-button>
        <el-button @click="closeEditProfileDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import axiosInstance from '../api';
export default {
  name: 'PersonalCenter',
  data() {
    return {
      user: {
        user_id: '',
        username: '',
        email: '',
        registration_date: '',
        last_login_date: '',
      },
      passwordRules: {
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ]
      },
      registerRules: {
          username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱格式错误', trigger: 'blur' },
          ],
        },
      passwordData: {
        newPassword: '',
        confirmPassword: ''
      },
      editProfileForm: {
        username: '',
        email: '',
      },
      changePasswordDialogVisible: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      editProfileDialogVisible: false,
      editedUsername: '',
      editedEmail: '',
    };
  },
  mounted() {
    const token = window.localStorage.getItem('token');
    console.log(token);
    if(token !== null){
      this.getUserInfo();
    }
    else {
      this.$router.push('/login');
      this.$notify({
        title: '未登录',
        message: '请先登录在线电子商务平台',
        type: 'error'
      });
    };
  },
  methods: {
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.passwordData.newPassword) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    },
    openChangePasswordDialog() {
      this.changePasswordDialogVisible = true;
    },
    openEditProfileDialog() {
      this.editProfileDialogVisible = true;
      this.editProfileForm.email = this.user.email;
      this.editProfileForm.username = this.user.username;
    },
    closeChangePasswordDialog() {
      this.changePasswordDialogVisible = false;
      this.currentPassword = '';
      this.newPassword = '';
      this.confirmPassword = '';
    },
    closeEditProfileDialog() {
      this.editProfileDialogVisible = false;
    },
    async updatePassword() {
      console.log(this.passwordData.confirmPassword);
      await this.$refs.passwordForm.validate(valid => {
        if (valid) {
          // 提交修改密码逻辑
          // 新密码和确认密码相同，进行密码更新操作
          const newPassword = this.passwordData.newPassword;
          // 执行密码更新操作
          axiosInstance.request({
              method: 'post',
              url: 'users/reset_password/',
              data: { 
                password: newPassword,
                email: this.user.email,
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
                  title: '修改密码成功',
                  message: '您已修改密码',
                  type: 'success'
                });
              })
              .catch(error => {
                // 处理错误
                console.error(error);
              });
        } else {
          // 表单验证不通过，显示错误信息
          return false;
        }
      });
    },
    async editProfile() {
      console.log(this.editProfileForm.email, this.editProfileForm.username);
      await axiosInstance.request({
              method: 'post',
              url: 'users/update_profile/',
              data: { 
                username: this.editProfileForm.username,
                email: this.editProfileForm.email,
                password: this.user.password,
              }
            })
              .then(response => {
                console.log(response);
                console.log(response.data);
                this.getUserInfo();
                this.editProfileDialogVisible = false;
                this.$notify({
                  title: '修改个人信息成功',
                  message: '您已修改修改个人信息',
                  type: 'success'
                });
              })
              .catch(error => {
                // 处理错误
                console.error(error);
              });
    },
    async getUserInfo() {
      await axiosInstance.request({
            method: 'post',
            url: 'users/get_profile/',
            data: {}
          })
            .then(response => {
              if(response.data.code == '200')
              {
                this.user = response.data.data;
                console.log(this.user);
              }
              else
              {
              }
              
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
    },
  }
};
</script>
  
<style>
.profile {
  margin: 20px;
}
  
.profile h2 {
  margin-bottom: 20px;
}
  
.profile-info {
  margin-bottom: 20px;
}
  
.info-item {
  margin-bottom: 10px;
}
  
.label {
  font-weight: bold;
  margin-right: 10px;
}
  
.order-history {
  margin-top: 20px;
}
</style>
  