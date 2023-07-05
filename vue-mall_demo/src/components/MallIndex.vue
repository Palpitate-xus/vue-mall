<template>
    <div class="home">
      <el-carousel :interval="5000" arrow="always" indicator-position="outside">
        <el-carousel-item v-for="slide in slides" :key="slide.id">
          <img :src="slide.image" alt="Slide Image" class="slide-image" />
        </el-carousel-item>
      </el-carousel>
  
      <div class="recommendation">
        <h2>精选好物</h2>
        <el-row :gutter="20">
          <el-col v-for="product in recommendedProducts" :key="product.product_id" :span="6">
            <el-card :body-style="{ padding: '20px' }">
              <div class="product-image">
                <img :src="product.product_image" alt="Product Image" />
              </div>
              <div class="product-info">
                <div class="product-name">{{ product.product_name }}</div>
                <div class="product-price">{{ product.product_price }}</div>
                <div class="product-actions">
                      <el-button
                        type="primary"
                        icon="el-icon-shopping-cart-2"
                        @click="showInfo(product)"
                      >加入购物车</el-button>
                  <el-button
                    type="text"
                    icon="el-icon-star-on"
                    @click="addToWishlist(product)"
                  >{{ wishlistButton }}</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="商品详情" :visible.sync="dialogVisible" width="45%">
      <div class="product-details">
        <div class="product-info">
          <img :src="product.product_image" :alt="product.name" class="product-image" />
          <div class="product-details-info">
            <h3>{{ product.product_name }}</h3>
            <p>{{ product.product_description }}</p>
            <p>价格: {{ product.product_price }}</p>
            <el-input-number v-model="quantity" :min="1" :max="10" :step="1"></el-input-number>
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
  import axiosInstance from '../api';
  export default {
    name: 'MallIndex',
    data() {
      return {
        dialogVisible: false,
        wishlistButton: '加入愿望单',
        product: {},
        quantity: 1,
        slides: [],
        recommendedProducts: [],
      };
    },
    mounted() {
      this.getRecommend()
      this.fetchBanners()
    },
    methods: {
      showInfo(item) {
        this.product = item
        this.dialogVisible = true;
        console.log(this.visible);
      },
      async addToCart() {
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
      async addToWishlist(item) {
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
      async getRecommend() {
        await axiosInstance.request({
              method: 'post',
              url: 'users/get_recomm/',
              data: {}
            })
              .then(response => {
                // 处理响应数据
                console.log(response);
                console.log(response.data.data.products);
                this.recommendedProducts = response.data.data.products;
              })
              .catch(error => {
                // 处理错误
                console.error(error);
              });
      },
      async fetchBanners() {
        await axiosInstance.request({
              method: 'post',
              url: 'store/banner/',
              data: {}
            })
              .then(response => {
                // 处理响应数据
                console.log(response);
                console.log(response.data.data);
                this.slides = response.data.data.image;
              })
              .catch(error => {
                // 处理错误
                console.error(error);
              });
      },
    }
  };
</script>
  
<style>
  .home {
    margin: 20px;
  }
  
  .slide-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .category {
    margin: 20px 0;
  }
  
  .category-item {
    text-align: center;
    cursor: pointer;
  }
  
  .category-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-bottom: 10px;
  }
  
  .category-name {
    font-weight: bold;
  }
  
  .recommendation {
    margin-bottom: 20px;
  }
  
  .recommendation h2 {
    margin-bottom: 10px;
  }
  
  .product-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .product-info {
    margin-top: 10px;
  }
  
  .product-name {
    font-weight: bold;
  }
  
  .product-price {
    margin-top: 5px;
  }
  
  .product-actions {
    margin-top: 10px;
  }
  
  .announcement {
    margin-bottom: 20px;
  }
  
  .announcement h2 {
    margin-bottom: 10px;
  }
</style>
  