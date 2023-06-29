<template>
    <div class="checkout">
      <h2>订单结算</h2>
      <div v-if="cartItems.length">
        <ul>
          <li v-for="item in cartItems" :key="item.id">
            {{ item.name }} - {{ item.price }} - Quantity: {{ item.quantity }}
          </li>
        </ul>
        <p>Total Price: {{ totalPrice }}</p>
        <button @click="placeOrder">提交订单</button>
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
        cartItems: [],
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
    mounted() {
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
      placeOrder() {
        // Place order logic
        // ...
        // Clear cart after placing the order
        this.clearCart();
        alert('Order placed successfully!');
      },
      clearCart() {
        axios.delete('/api/cart')
          .then(response => {
            this.cartItems = [];
          })
          .catch(error => {
            console.error('Failed to clear cart:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  .checkout {
    margin: 20px;
  }
  </style>
  