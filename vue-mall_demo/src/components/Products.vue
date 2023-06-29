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
                  @click="dialogVisible = true"
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
    <!-- <el-dialog
      title="加入购物车"
      :visible.sync="dialogVisible"
      width="75%"
      :before-close="handleClose">
      <span>请选择购买数量</span>
      <el-form>
        <el-form-item label="购买数量">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
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
import store from '../store'
export default {
  name: 'Products',
  data () {
    return {
      dialogVisible: false,
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
      ],
      product: {
        name: 'Product 1',
        description: 'Product description',
        price: 19.99,
        imageUrl: 'https://img12.360buyimg.com/n7/jfs/t1/168650/27/37797/57442/649a977eFb1d43aff/67de18b48ae18900.jpg',
      },
      quantity: 1,
    }
  },
  methods: {
  addToCart(product) {
    console.log("add cart success");
    this.$message({
      message: '加入购物车成功',
      type: 'success'
    });
    this.dialogVisible = false;
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
