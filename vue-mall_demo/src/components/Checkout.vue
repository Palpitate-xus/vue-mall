<template>
  <div class="checkout">
    <h2>购物车结算</h2>
    <div v-if="cartItems.length">
      <el-table :data="cartItems" style="width: 100%">
        <el-table-column prop="product_name" label="商品名称"></el-table-column>
        <el-table-column prop="product_price" label="商品价格"></el-table-column>
        <el-table-column prop="quantity" label="购买数量"></el-table-column>
        <el-table-column label="小计">
          <template slot-scope="{ row }">
            {{ calculateSubtotal(row) }}
          </template>
        </el-table-column>
      </el-table>
      <div class="address">
        <p>选择收货地址：</p>
        <el-select v-model="value" filterable placeholder="请选择地址">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.concatenatedAddress"
          :value="item.concatenatedAddress">
        </el-option>
      </el-select>
      </div>
      <div class="total">
        总计: {{ totalPrice }}
      </div>
      <div class="actions">
        <el-button @click="$router.push('./cart')">返回</el-button>
        <el-button type="primary" @click="placeOrder">提交订单</el-button>
      </div>
    </div>
    <div v-else>
      <el-empty description="购物车是空的"></el-empty>
    </div>
    <payment ref="payment"></payment>
  </div>
</template>

<script>
import axiosInstance from '../api';
import Payment from './Payment';
export default {
  name: 'Checkout',
  components: {
    Payment
  },
  data() {
    return {
      cartItems: [],
      options: [],
      value: '',
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.product_price * item.quantity,
        0
      );
    },
  },
  created() {
    this.fetchCartList();
    this.fetchAddresses();
  },
  methods: {
    async fetchCartList() {
      await axiosInstance.request({
            method: 'post',
            url: 'cart/get_user_cart/',
            data: {}
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data);
              if(response.data.code == '200')
              {
                this.cartItems = response.data.data.shoppingcart;
                console.log(this.cartItems);
              }
              else
              {
                this.$message({
                  message: response.data.message,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
    },
    calculateSubtotal(item) {
      return (item.product_price * item.quantity).toFixed(2);
    },
    async placeOrder() {
      if(this.value === ''){
        this.$message({
          message: '未选择地址',
          type: 'error',
        })
      }
      else{
            await axiosInstance.request({
            method: 'post',
            url: 'orders/create_order/',
            data: {
              order_details: this.cartItems,
              shipping_address: this.value,
            }
          })
            .then(response => {
              // 处理响应数据
              // console.log(response);
              // console.log(response.data.data);
              if(response.data.code == '200')
              {
                this.$refs['payment'].qrCodeUrl = "data:image/image;base64," + response.data.data.qr_code;
                console.log(this.$refs['payment'].qrCodeUrl);
                this.$refs['payment'].dialogVisible = true;
              }
              else
              {
                this.$message({
                  message: response.data.message,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
      }

    },
    async fetchAddresses() {
      await axiosInstance.request({
            method: 'post',
            url: 'users/addresslist/',
            data: {}
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data);
              if(response.data.code == '200')
              {
                const concatenatedAddresses = response.data.data.address.map(address => {
                const concatenatedAddress = `${address.recipient_name}, ${address.phone_number}, ${address.province}, ${address.city}, ${address.street}`;
                return {
                  id: address.address_id,
                  concatenatedAddress
                };
              });
              this.options = concatenatedAddresses;
              }
              else
              {
                this.$message({
                  message: response.data.message,
                  type: 'error'
                })
              }
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
    },
    returnBack() {
      this.$router.push('./cart');
    },
  },
};
</script>

<style scoped>
.checkout {
  margin: 20px;
}

.total {
  margin-top: 20px;
  text-align: right;
  font-weight: bold;
}

.address {
  margin-top: 20px;
  text-align: left;
}

.actions {
  margin-top: 20px;
  text-align: right;
}
</style>
