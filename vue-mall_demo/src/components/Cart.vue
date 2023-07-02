<template>
  <div class="cart">
    <h2>购物车</h2>
    <el-table :data="cartItems" style="width: 100%">
      <el-table-column prop="add_time" label="加入时间"></el-table-column>
      <el-table-column prop="product_name" label="商品名称"></el-table-column>
      <el-table-column prop="product_price" label="单价"></el-table-column>
      <el-table-column prop="(quantity, stock_quantity)" label="数量">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.quantity" :min="1" :max="scope.row.stock_quantity" @change="updateQuantity(scope.row)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="小计">
        <template slot-scope="scope">
          {{ calculateTotal(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="removeFromCart(scope.row)">移出</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="cart-summary">
      <div>总数量: {{ totalItems }}</div>
      <div>总价格: {{ totalPrice }}</div>
      <el-button type="primary" @click="checkout">结算</el-button>
    </div>
  </div>
</template>
  
<script>
import axiosInstance from '../api';
export default {
  data() {
    return {
      cartItems: [],
    };
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0).toFixed(2);
    }
  },
  mounted() {
    const token = window.localStorage.getItem('token');
    console.log(token);
    if(token !== null){
      this.getCartList();
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
    async getCartList() {
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
    async updateQuantity(item) {
      console.log('this is:', item);
      if (item.quantity < 1) {
        item.quantity = 1;
      } else if (item.quantity > item.stock_quantity) {
        item.quantity = item.stock_quantity;
      }
      console.log(item.quantity);
      await this.removeCart(item);
      await this.addToCart(item);
    },
    calculateTotal(item) {
      return (item.product_price * item.quantity).toFixed(2);
    },
    async addToCart(item) {
      console.log("add cart success");
      await axiosInstance.request({
            method: 'post',
            url: 'cart/add_to_cart/',
            data: {
              product_id: item.product_id,
              quantity: item.quantity,
            }
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data);
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
    },
    async removeCart(item) {
      await axiosInstance.request({
            method: 'post',
            url: 'cart/remove_from_cart',
            data: {
              product_id: item.product_id,
            }
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data);
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
    },
    async removeFromCart(item) {
      await axiosInstance.request({
            method: 'post',
            url: 'cart/remove_from_cart',
            data: {
              product_id: item.product_id,
            }
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data);
              // this.$router.push('/');
              // this.$notify({
              //   title: '登陆成功',
              //   message: '欢迎来到在线电子商务平台',
              //   type: 'success'
              // });
              if(response.data.code == '200')
              {
                this.getCartList();
                // this.cartItems = response.data.data.shoppingcart;
                // console.log(this.cartItems);
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
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
    checkout() {
      this.$router.push('./checkout');
    }
  }
};
</script>
  
<style>
.cart {
  margin: 20px;
}
  
.cart h2 {
  margin-bottom: 20px;
}
  
.cart-summary {
  margin-top: 20px;
  text-align: right;
}
</style>
  