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
        qrCodeUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAJFBMVEX///8AAACxsbFJSUnX19c/Pz+ampocHBzp6eloaGiDg4MoKCi97XzDAAAEtUlEQVR4nO2bbcN0IBCFKUT+//99TGlyasqy7r1fns4nZmtcCKeX7bqmpp+lWZ2Jiw4hMvCeiwvFX09KmfoTjVx0CaGF9ibammkLy7vzOkvaX0LQX4FgGoKIMA2iJkRwMQqtdlkW7WA2WS7q0jCClZMqIyJAA01+0xgTTomLDqGQQ5gKSdfnEUxDePZGaMg7AIKC35YaFSIs8JtqCH8AYdRaG0aYN30aoZPTNYT/FUFNmwoIetplvxQBTxkRLBRqCO8gjHnpTyOgv5pzhMlauzjvhQgutFivBRGEpO/4BXdGhTrRBSOCkLQhlBEKfnt6C6GUVDbxNe1+wRhvDWlj78psW3MIuSfCAkJNtxD63Z3ShtCbaghvI6xjXUtEILvmEbatKYR826OQ3YqvDuEsafLKfUWqfEIHDeeJ7qshvI5QeMmeac5HwoRBONfW7fapdI1wpI1oL6b9I2ndVeA6Q36cWQDIHsraKQsPJclgwkiWH0e+TIhg8tBVBO5z/V6EXgidIfSY8DrCrLYPqGtttDFQq3IDZ0sIqRqCCmNsQ2iSts8RlpCUG67NOF5735e+ESShCUeE0yv3CIJw82oISfv5KwgXb0TiF9Z1NTmC07j9dvCOZl2Tm6i3AnG2gJui9xhUnF+RdBzDvbaCZREQTC/a1wMCpEsQ+MrxcRpCBcFsPiq2hW1v9e2IXNq4jqtzaf4Imx071KWwTzd7eQQyb1QnRaDMquM6qbB1xzNyR8LWjXUEcZ0eELBOQ/iJCGSo9s/i0bgdQvRhw69sLOBkQa4OhTXt4Xm5XHLPGs8BX7Zjl0mwOVEcL3Tua+8FTochoeNTRShYlt+EIBi3qzfiFGEMxwkS2t5UaI4qOC5sjhFBFYwbNug45X/UqV+IY4hYBxHi4RGB9pKZnIbwPEIM3USIH9Fl+zKP8ctM9WhAZI3pcFZsDsoRNHzgR0aY9tGXFR6zkpUonVFNaFmchDUPePMaAiPI5tpuFpxl7iPsaYxHCEnzVy7SoenrMIStG1+2eOX6PE1FiDC8jlC7eQ3hEoIb4pjAUCXrjBhBhUVFfv6J9sZQx6VZcgQ3SIJH5KQccAXhjAS/IKxfEJpwSYiQ+YVThNISCuHmvYYgu6afgsAXSHDQTyKIxs0PzA7HfkRUbI4ThEoIOHKsw/FmHiGWjduphBdmCQEr1mb1GsKzCEnf4zrChekxDllGGIJxS2ZrKaliBF+HptTE6bELk4Ss6tCnQ6ANXL9w5poagg/JEhBMPm3uC+zFd4RtJyJAHac1QzhdvxARsA6vf8HuT5QwVikf5jaCbgjd4zeitqjoMEEVVhDxVJZbSqQYAdNoQJhTz5Yg1JZWnT6UHSMI4gJCnU68r/5sG8JPRJjZhDGC819hoeWkOISz/Ygge7Y7C0+Tbi0pn35NHuSK3kPAV9P/ivDBG0EL0scBxthiiEqt+ijPSL9F70jFvZejEjcQQiiq9I8h4crlx7n7z4CG8BmEXCW/EDXmh5dTpdjPIeiG0D15I7QVtZwi0P/5nDQWQPeGCCp1b1d7U4XzE3pTwoWRFxV9D8JbfcrvQEhG3AoIWODajXjtT84D7AmasUCeoXspTVPTN+ofEoBMRjs8oIoAAAAASUVORK5CYII=', // QR code image URL
        paymentCompleted: false,
      };
    },
    created() {
      this.generateQRCode();
    },
    methods: {
      generateQRCode() {
        axios.get('/api/payment/generateQrCode')
          .then(response => {
            this.qrCodeUrl = response.data.qrCodeUrl;
          })
          .catch(error => {
            console.error('Failed to generate QR code:', error);
          });
      },
      checkPaymentStatus() {
        axios.get('/api/payment/checkStatus')
          .then(response => {
            if (response.data.paymentStatus === 'completed') {
              this.paymentCompleted = true;
              this.$router.push('/payment-success');
            } else {
              setTimeout(this.checkPaymentStatus, 3000);
            }
          })
          .catch(error => {
            console.error('Failed to check payment status:', error);
          });
      },
    },
    mounted() {
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
  