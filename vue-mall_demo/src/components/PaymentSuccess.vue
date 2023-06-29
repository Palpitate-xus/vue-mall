<template>
    <div class="payment-success">
        <el-result icon="success" title="支付成功">
            <template slot="extra">
                <div class="order-details">
                    <h3>订单详情</h3>
                    <p>订单ID: {{ orderId }}</p>
                    <p>支付金额: {{ paymentAmount }}</p>
                </div>
                <el-button type="primary" size="medium" @click="$router.push('/cart')">返回</el-button>
            </template>
         </el-result>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PaymentSuccess',
    data() {
        return {
            orderId: 'testOrderID',
            paymentAmount: '$69.97'
        }
    }
  }
  </script>
  
  <style scoped>
  .payment-success {
    margin: 20px;
  }
  
  .order-details {
    margin-top: 20px;
  }
  </style>
  