<template>
  <el-dialog class="payment" :visible.sync="dialogVisible">
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
  </el-dialog>
</template>
  
<script>
import axiosInstance from '../api';
  
  export default {
    name: 'Payment',
    data() {
      return {
        qrCodeUrl: '二维码获取错误',
        paymentCompleted: false,
        dialogVisible: false,
      };
    },
    methods: {
      generateQRCode(item) {
        axiosInstance.post('/payments/pay_order', {
          order_id: item.order_id,
        })
          .then(response => {
            this.qrCodeUrl = "data:image/image;base64," + response.data.data.qr_code;
          })
          .catch(error => {
            console.error('Failed to generate QR code:', error);
          });
      },
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
  