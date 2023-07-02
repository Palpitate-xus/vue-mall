<template>
  <div class="wishlist-container">
    <h2 class="page-title">愿望单</h2>
      <div class="wish-list">
        <div v-for="(wish, index) in wishList" :key="index" class="wish-item">
          <div class="wish-details">
            <img :src="wish.image" alt="Wish Image" class="wish-image" />
            <div class="wish-info">
              <h3 class="wish-name">{{ wish.name }}</h3>
              <p class="wish-price">{{ wish.price }}</p>
              <p class="wish-time">添加时间:{{ wish.time }}</p>
            </div>
          </div>
        <span class="add-to-cart" @click="addToCart(index)">加入购物车</span>
        <span class="delete-wish" @click="deleteWish(index)">删除</span>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'WishList',
  data() {
    return {
      wishList: [
        {
          name: '商品1',
          image: 'https://img11.360buyimg.com/seckillcms/s280x280_jfs/t1/114234/2/38348/930930/6497e774F1d039a56/e6d41b090c7b8962.png.avif',
          time: '2023-06-28',
          price: '$19.99'
        },
        {
          name: '商品2',
          image: 'https://img11.360buyimg.com/seckillcms/s280x280_jfs/t20260624/108888/14/39198/29659/6497aeb3Fe63b1023/488533e55b34696e.jpg.avif',
          time: '2023-06-29',
          price: '$29.99'
        },
        {
          name: '商品3',
          image: 'https://img12.360buyimg.com/seckillcms/s280x280_jfs/t20260624/198360/31/36743/71191/6497ef30F39e398a2/fc319351710f4267.png.avif',
          time: '2023-06-29',
          price: '$39.99'
        }
      ]
    };
  },
  mounted() {
    const token = window.localStorage.getItem('token');
    console.log(token);
    if(token !== null){
      this.getUserInfo();
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
    deleteWish(index) {
      this.wishList.splice(index, 1);
    }
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
