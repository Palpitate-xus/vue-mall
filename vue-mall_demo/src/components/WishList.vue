<template>
  <div class="wishlist-container">
    <h2 class="page-title">愿望单</h2>
      <div class="wish-list">
        <div v-for="(wish, index) in wishList" :key="index" class="wish-item">
          <div class="wish-details">
            <img :src="wish.product_image" alt="Wish Image" class="wish-image" />
            <div class="wish-info">
              <h3 class="wish-name">{{ wish.product_name }}</h3>
              <p class="wish-price">{{ wish.product_price }}</p>
            </div>
          </div>
        <span class="add-to-cart" @click="showInfo(wish)">加入购物车</span>
        <span class="delete-wish" @click="deleteWish(wish, index)">删除</span>
      </div>
    </div>
    <el-empty description="当前无商品" v-if="wishList.length==0"></el-empty>
    <el-dialog title="商品详情" :visible.sync="dialogVisible" width="45%">
      <div class="product-details">
        <div class="product-info">
          <img :src="product.product_image" :alt="product.product_name" />
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
import axiosInstance from '../api';
export default {
  name: 'WishList',
  data() {
    return {
      wishList: [],
      product: {},
      dialogVisible: false,
      quantity: 1,
    };
  },
  mounted() {
    const token = window.localStorage.getItem('token');
    console.log(token);
    if(token !== null){
      this.fetchWishList();
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
    showInfo(item) {
      this.dialogVisible = true;
      this.product = item;
    },
    async deleteWish(item, index) {
      await axiosInstance.request({
                method: "post",
                url: "users/remove_from_wishlist/",
                data: {
                  product_id: item.product_id,
                }
            })
                .then(response => {
                // 处理响应数据
                console.log(response);
                console.log(response.data.data);
                if (response.data.code == "200") {
                    // this.orderHistory = response.data.data.orders;
                    this.wishList.splice(index, 1);
                    this.fetchWishList();
                    this.$message({
                        message: "删除成功",
                        type: "success"
                    });
                }
                else {
                    this.$message({
                        message: response.data.message,
                        type: "error"
                    });
                }
            })
              .catch(error => {
              // 处理错误
              console.error(error);
            });
    },
    async fetchWishList() {
      await axiosInstance.request({
                method: "post",
                url: "users/wishlist",
                data: {}
            })
                .then(response => {
                // 处理响应数据
                console.log(response);
                console.log(response.data.data);
                if (response.data.code == "200") {
                    // this.orderHistory = response.data.data.orders;
                    this.wishList = response.data.data.products;
                }
                else {
                    this.$message({
                        message: response.data.message,
                        type: "error"
                    });
                }
            })
              .catch(error => {
              // 处理错误
              console.error(error);
            });
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
  }
};
</script>
  
<style scoped>
.wishlist-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
  
.page-title {
  text-align: center;
}
 
.product-list {
  margin: 15px;
}

.wish-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}
  
.wish-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
  
.wish-details {
  display: flex;
  align-items: center;
}
  
.wish-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}
  
.wish-info {
  flex: 1;
}
  
.wish-name {
  margin: 0;
}
  
.wish-price {
  margin: 0;
  color: #888;
}
  
.add-to-cart {
  color: #38a2ed;
  cursor: pointer;
  text-align: right;
}


.delete-wish {
  color: #ff4d4f;
  cursor: pointer;
  text-align: right;
}
</style>
