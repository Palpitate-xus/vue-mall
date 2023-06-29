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
    computed: {
      orderId() {
        // Get order ID from the route or vuex store
        return this.$route.params.orderId; // Assuming order ID is passed as a route parameter
        // Alternatively, you can retrieve it from the vuex store
        // return this.$store.state.order.orderId;
      },
      paymentAmount() {
        // Get payment amount from the route or vuex store
        return this.$route.params.paymentAmount; // Assuming payment amount is passed as a route parameter
        // Alternatively, you can retrieve it from the vuex store
        // return this.$store.state.order.paymentAmount;
      },
    },
  };
  </script>
  
  <style scoped>
  .payment-success {
    margin: 20px;
  }
  
  .order-details {
    margin-top: 20px;
  }
  </style>
  