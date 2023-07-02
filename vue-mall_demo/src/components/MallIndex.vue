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
          <el-col v-for="product in recommendedProducts" :key="product.id" :span="6">
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
                        @click="showInfo"
                      >加入购物车</el-button>
                  <el-button
                    type="text"
                    icon="el-icon-star-on"
                    @click="addToWishlist"
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
          <img :src="product.imageUrl" :alt="product.name" class="product-image" />
          <div class="product-details-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>Price: ${{ product.price }}</p>
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
  export default {
    name: 'MallIndex',
    data() {
      return {
        dialogVisible: false,
        wishlistButton: '加入愿望单',
        product: {
        name: 'Product 1',
        description: 'Product description',
        price: 29.99,
        imageUrl: 'https://img20.360buyimg.com/seckillcms/s280x280_jfs/t20260619/113833/3/39445/53972/64914cffF631562d4/4be78f2804813246.png.avif',
        },
      quantity: 1,
        slides: [
          {
            id: 1,
            image: 'https://imgcps.jd.com/ling-cubic/ling4/lab/amZzL3QxLzEzMDg0NS8zLzM2NDk2LzExMDc4My82NDYwOWU3MEZhYjJlZjg0Yi9kNWFlZGZmZWMzZThlYTZlLnBuZw/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/1635188868130873346/cr/s/q.jpg'
          },
          {
            id: 2,
            image: 'https://imgcps.jd.com/ling-cubic/ling4/lab/amZzL3QxLzQ5MTQzLzI4LzE3MDM2LzIxOTg4OS82MTM4NDhkNkU2MDY1ZWM5OC9iM2I4ZWE1ODE5MmQzNmI0LnBuZw/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/1635188868130873346/cr/s/q.jpg'
          },
          {
            id: 3,
            image: 'https://img12.360buyimg.com/pop/s1180x940_jfs/t1/221198/1/25542/78251/64560d2aFcbbb64f4/96669230fcbaf0a9.png.avif'
          },
          {
            id: 4,
            image: 'https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100048189548/FocusFullshop/CkNqZnMvdDEvMjIxMDMzLzM4LzI5NzQ0LzY5MTIwLzY0ODRjYmUyRjQ5NjQyMDM2LzZlYjY4NjhiNjBiZjdjMWIucG5nEgk0LXR5XzBfNTUwAjjui3pCEwoP5Z2a5p6c5oqV5b2x5py6EAFCFgoS5a6e5oOg5LiN5a656ZSZ6L-HEAJCEAoM56uL5Y2z5oqi6LStEAZCBwoD5oqiEAdY7PDY2vQC/cr/s/q.jpg'
          },
          {
            id: 5,
            image: 'https://img11.360buyimg.com/pop/s1180x940_jfs/t1/190492/13/7300/66647/60c06365E18831313/add1aa7d07d3d0e9.jpg.avif'
          },
          // Add more slides here...
        ],
        categories: [
          {
            id: 1,
            name: 'Category 1',
            image: 'path/to/category1.jpg'
          },
          {
            id: 2,
            name: 'Category 2',
            image: 'path/to/category2.jpg'
          },
          // Add more categories here...
        ],
        recommendedProducts: [
          {
            id: 1,
            name: 'Product 1',
            price: '$19.99',
            image: 'https://img20.360buyimg.com/seckillcms/s280x280_jfs/t20260619/113833/3/39445/53972/64914cffF631562d4/4be78f2804813246.png.avif'
          },
          {
            id: 2,
            name: 'Product 2',
            price: '$29.99',
            image: 'https://img11.360buyimg.com/jdcms/s300x300_jfs/t1/119607/27/23674/49661/63e8e9a7Fb5b5085c/1e2675c7cbfcd03a.jpg.avif'
          },
          // Add more recommended products here...
        ],
      };
    },
    methods: {
      showInfo() {
        this.dialogVisible = true;
        console.log(this.visible);
      },
      addToCart(item) {
        this.$message({
          message: '加入购物车成功',
          type: 'success'
        });
        this.dialogVisible = false;
      },
      addToWishlist(item) {
        if(this.wishlistButton == '加入愿望单')
        {
          this.$message({
            message: '加入愿望单成功',
            type: 'success'
          });
          this.wishlistButton = '移出愿望单'
        }
        else
        {
          this.$message({
            message: '移出愿望单成功',
            type: 'success'
          });
          this.wishlistButton = '加入愿望单'
        }
        
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
  