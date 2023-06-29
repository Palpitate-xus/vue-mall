<template>
    <div class="payment-failure">
      <el-result icon="error" title="支付失败" subTitle="请重试或者联系客服">
      <template slot="extra">
        <el-button type="primary" size="medium" @click="$router.push('/payment')">返回重试</el-button>
        <el-button type="primary" size="medium">联系客服</el-button>
      </template>
    </el-result>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaymentFailure',
  };
  </script>
  
  <style scoped>
  .payment-failure {
    margin: 20px;
  }
  
  .failure-message {
    margin-top: 20px;
  }
  </style>
  