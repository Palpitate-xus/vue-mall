<template>
  <div class="cart">
    <h2>购物车</h2>
    <el-table :data="cartItems" style="width: 100%">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="单价"></el-table-column>
      <el-table-column prop="quantity" label="数量">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.quantity" :min="1" :max="10" @change="updateQuantity(scope.row)"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="总价">
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
export default {
  data() {
    return {
      cartItems: [
        {
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
        },
        // Add more cart items here...
      ]
    };
  },
  computed: {
    totalItems() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  methods: {
    updateQuantity(item) {
      if (item.quantity < 1) {
        item.quantity = 1;
      } else if (item.quantity > 10) {
        item.quantity = 10;
      }
    },
    calculateTotal(item) {
      return (item.price * item.quantity).toFixed(2);
    },
    removeFromCart(item) {
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
  