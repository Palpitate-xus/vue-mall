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
    </div>
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
    async getUserInfo() {
      await axiosInstance.request({
            method: 'post',
            url: 'users/get_profile/',
            data: {}
          })
            .then(response => {
              // 处理响应数据
              // this.$router.push('/');
              // this.$notify({
              //   title: '登陆成功',
              //   message: '欢迎来到在线电子商务平台',
              //   type: 'success'
              // });
              if(response.data.code == '200')
              {
                this.user = response.data.data;
                console.log(this.user);
              }
              else
              {
                // this.$message({
                //   message: response.data.message,
                //   type: 'error'
                // })
              }
              
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
    },
    viewOrder(order) {
      // Logic to view order details
      console.log('View order:', order.orderId);
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
  