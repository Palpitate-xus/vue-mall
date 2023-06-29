<template>
    <div class="payment">
      <h2>订单支付</h2>
      <div>
        <div class="qr-code">
          <el-image :src="qrCodeUrl" fit="contain"></el-image>
        </div>
        <div class="instructions">
            <p>使用手机支付应用程序扫描二维码完成支付。</p>
            <p>支付成功后，您将被重定向到支付成功页面。</p>
        </div>
      </div>
      <el-button type="danger" @click="$router.push('/checkout')">取消支付</el-button>
      <el-button type="primary" @click="$router.push('/cart')">稍后支付</el-button>
      <el-divider/>
      <el-button @click="$router.push('./payment/success')">测试：跳转支付成功</el-button>
      <el-button @click="$router.push('/payment/fail')">测试：跳转支付失败</el-button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Payment',
    data() {
      return {
        qrCodeUrl: '', // QR code image URL
        paymentCompleted: false,
      };
    },
    created() {
      this.generateQRCode();
    },
    methods: {
      generateQRCode() {
        // Make API request to generate the QR code URL
        axios.get('/api/payment/generateQrCode')
          .then(response => {
            this.qrCodeUrl = response.data.qrCodeUrl;
          })
          .catch(error => {
            console.error('Failed to generate QR code:', error);
          });
      },
      checkPaymentStatus() {
        // Make API request to check payment status
        axios.get('/api/payment/checkStatus')
          .then(response => {
            if (response.data.paymentStatus === 'completed') {
              this.paymentCompleted = true;
              // Redirect to payment success page
              this.$router.push('/payment-success');
            } else {
              // Payment not completed, check again after a delay
              setTimeout(this.checkPaymentStatus, 3000);
            }
          })
          .catch(error => {
            console.error('Failed to check payment status:', error);
          });
      },
    },
    mounted() {
      // Start checking payment status after component is mounted
      this.checkPaymentStatus();
    },
  };
  </script>
  
  <style scoped>
  .payment {
    margin: 20px;
  }
  
  .qr-code {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .instructions {
    text-align: center;
  }
  </style>
  