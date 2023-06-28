<template>
  <div class="hello">
    <div class="product-list">
      <el-row :gutter="20">
        <el-col v-for="product in products" :key="product.id" :span="6">
          <el-card :body-style="{ padding: '20px' }">
            <div class="product-image">
              <img :src="product.image" alt="Product Image" />
            </div>
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-price">{{ product.price }}</div>
              <div class="product-actions">
                <el-button
                  type="primary"
                  icon="el-icon-shopping-cart-2"
                  @click="addToCart(product)"
                >
                  加入购物车
                </el-button>
                <el-button type="text" icon="el-icon-star-on">加入愿望单</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import store from '../store'
export default {
  name: 'Products',
  data () {
    return {
      products: [
        {
          id: 1,
          name: 'Product 1',
          price: '$19.99',
          image: 'https://img14.360buyimg.com/n7/jfs/t1/199278/25/35719/62946/6491488bF12bc58c4/b35e427e0c681bfd.jpg'
        },
        {
          id: 2,
          name: 'Product 2',
          price: '$29.99',
          image: 'https://img12.360buyimg.com/n7/jfs/t1/168650/27/37797/57442/649a977eFb1d43aff/67de18b48ae18900.jpg'
        },
        // Add more products here...
      ]
    }
  },
  methods: {
  addToCart(product) {
    console.log(this);
    console.log(this.$store);
    store.dispatch('cart/addProductToCart', product);
    console.log("add cart success");
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.product-list {
  margin: 15px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
