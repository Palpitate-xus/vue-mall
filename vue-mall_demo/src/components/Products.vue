<template>
  <div class="hello">
    <div class="product-list">
      <el-row :gutter="20">
        <el-col v-for="product in products" :key="product.product_id" :span="6">
          <el-card :body-style="{ padding: '20px' }">
            <div class="product-image">
              <img :src="product.product_image" alt="Product Image" />
            </div>
            <div class="product-info">
              <div class="product-name">{{ product.product_name }}</div>
              <div class="product-price">价格：{{ product.product_price }}</div>
              <div class="product-actions">
                <el-button
                  type="primary"
                  icon="el-icon-shopping-cart-2"
                  @click="showInfo(product)"
                >
                  加入购物车
                </el-button>
                <el-button
                  type="text"
                  icon="el-icon-star-on"
                  @click="addToWish(product)"
                  >加入愿望单</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-empty description="当前无商品" v-if="products.length==0"></el-empty>
    <el-dialog title="商品详情" :visible.sync="dialogVisible" width="45%">
      <div class="product-details">
        <div class="product-info">
          <img :src="product.product_image" :alt="product.product_name" class="product-image" />
          <div class="product-details-info">
            <h3>{{ product.product_name }}</h3>
            <p>{{ product.product_description }}</p>
            <p>价格：{{ product.product_price }}</p>
            <p>库存：{{ product.stock_quantity }}</p>
            <el-input-number v-model="quantity" :min="1" :max="product.stock_quantity" :step="1"></el-input-number>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addToCart">加入购物车</el-button>
        <el-button @click="dialogVisible = false">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import axiosInstance from '../api';
export default {
  name: 'Products',
  data () {
    return {
      dialogVisible: false,
      products: [],
      product: {},
      quantity: 1,
    }
  },
  mounted() {
    this.getProductsList();
  },
  methods: {
   async getProductsList() {
      await axiosInstance.request({
            method: 'post',
            url: 'store/productlist/',
            data: {}
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data.products);
              this.products = response.data.data.products;
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
    },
    async addToCart(product) {
      const token = window.localStorage.getItem('token');
      if(token !== null){
        console.log("add cart success");
        await axiosInstance.request({
              method: 'post',
              url: 'cart/add_to_cart/',
              data: {
                product_id: this.product.product_id,
                quantity: this.quantity,
              }
            })
              .then(response => {
                // 处理响应数据
                console.log(response);
                console.log(response.data.data);
                if(response.data.code == '200')
                {
                  this.$message({
                    message: '加入购物车成功',
                    type: 'success'
                  });
                  this.dialogVisible = false;
                  this.quantity = 1;
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
      else {
        this.$router.push('/login');
        this.$notify({
          message: '您还未登录',
          type: 'info',
        })
      }
    },
    async addToWish(item) {
      console.log(item.product_id);
      const token = window.localStorage.getItem('token');
      if(token !== null){
        console.log("add wishlist success");
        await axiosInstance.request({
              method: 'post',
              url: 'users/add_to_wishlist',
              data: {
                product_id: item.product_id,
              }
            })
              .then(response => {
                // 处理响应数据
                console.log(response);
                console.log(response.data.data);
                if(response.data.code == '200')
                {
                  this.$message({
                    message: '加入愿望单成功',
                    type: 'success'
                  });
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
      else {
        this.$router.push('/login');
        this.$notify({
          message: '您还未登录',
          type: 'info',
        })
      }
    },
    showInfo(item) {
      console.log(item);
      this.product = item;
      this.dialogVisible = true;
    },
    handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
    },
}
}
</script>

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
