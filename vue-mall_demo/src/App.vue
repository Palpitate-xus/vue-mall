<template>
  <div id="app">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">商品</el-menu-item>
      <el-menu-item index="3">购物车</el-menu-item>
      <el-submenu index="4">
        <template slot="title">个人中心</template>
        <el-menu-item index="4-1">个人信息管理</el-menu-item>
        <el-menu-item index="4-2">订单管理</el-menu-item>
        <el-menu-item index="4-3">地址管理</el-menu-item>
        <el-menu-item index="4-4">愿望单</el-menu-item>
        <el-menu-item index="4-5">登录</el-menu-item>
        <el-menu-item index="4-6">注销</el-menu-item>
      </el-submenu>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key === '1') {
        this.$router.push('/');
      };
      if (key === '2') {
        this.$router.push('/products');
      };
      if (key === '3') {
        this.$router.push('/cart');
      };
      if (key === '4-1') {
        this.$router.push('/personalCenter');
        // console.log("go to personalCenter");
      };
      if (key === '4-2') {
        this.$router.push('/orderManagement');
      };
      if (key === '4-3') {
        this.$router.push('/addressManagement');
      };
      if (key === '4-4') {
        this.$router.push('/wishlist');
      };
      if (key === '4-5') {
        this.$router.push('/login');
      };
      if (key === '4-6') {
        const token = localStorage.getItem('token');
        if(token !== null)
        {
          window.localStorage.removeItem('token');
          this.$notify({
            title: '注销成功',
            // message: '这是一条成功的提示消息',
            type: 'success'
          });
          this.$router.push('/');
        }
        else
        {
          this.$notify.error({
            title: '注销错误',
            message: '当前未登录'
        });
        }
      };
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
