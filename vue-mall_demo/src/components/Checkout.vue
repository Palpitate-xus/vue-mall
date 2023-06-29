<template>
  <div class="checkout">
    <h2>购物车结算</h2>
    <div v-if="cartItems.length">
      <el-table :data="cartItems" style="width: 100%">
        <el-table-column prop="name" label="商品名称"></el-table-column>
        <el-table-column prop="price" label="商品价格"></el-table-column>
        <el-table-column prop="quantity" label="购买数量"></el-table-column>
        <el-table-column label="小计">
          <template slot-scope="{ row }">
            {{ calculateSubtotal(row) }}
          </template>
        </el-table-column>
      </el-table>
      <div class="total">
        总计: {{ totalPrice }}
      </div>
      <div class="actions">
        <el-button @click="$router.push('./cart')">返回</el-button>
        <el-button type="primary" @click="placeOrder">提交订单</el-button>
      </div>
    </div>
    <div v-else>
      <p>No items in the cart.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Checkout',
  data() {
    return {
      cartItems: [{
          id: 1,
          name: 'Product 1',
          price: 19.99,
          quantity: 2
        },
        {
          id: 2,
          name: 'Product 2',
          price: 29.99,
          quantity: 1
        },],
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  created() {
    this.fetchCartItems();
  },
  methods: {
    fetchCartItems() {
      axios.get('/api/cart')
        .then(response => {
          this.cartItems = response.data;
        })
        .catch(error => {
          console.error('Failed to fetch cart items:', error);
        });
    },
    calculateSubtotal(item) {
      return (item.price * item.quantity).toFixed(2);
    },
    async placeOrder() {
      // Place order logic
      // ...
      // Clear cart after placing the order
      await axios.delete('/api/cart')
        .then(() => {
          alert('Order placed successfully!');
          this.cartItems = [];
        })
        .catch(error => {
          console.error('Failed to place order:', error);
        });
      this.$router.push('./payment')
    },
    returnBack() {
      this.$router.push('./cart')
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

.actions {
  margin-top: 20px;
  text-align: right;
}
</style>
