<template>
  <div class="profile">
    <h3>订单</h3>
    <el-table :data="orderHistory" style="width: 100%">
      <el-table-column prop="order_id" label="订单号"></el-table-column>
      <el-table-column prop="order_time" label="时间"></el-table-column>
      <el-table-column prop="payment_status" label="支付状态"></el-table-column>
      <el-table-column prop="total_amount" label="总金额"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="viewOrder(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="订单详情"
      :visible="dialogVisible"
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <el-table :data="orderItems" border>
        <el-table-column prop="product_name" label="商品名称"></el-table-column>
        <el-table-column prop="product_price" label="商品价格"></el-table-column>
        <el-table-column prop="quantity" label="购买数量"></el-table-column>
      </el-table>
      <div v-if="orderItems.length === 0" class="no-items-message">
        <el-empty>订单中没有商品</el-empty>
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import axiosInstance from '../api';
export default {
  name: 'OrderManagement',
  data() {
    return {
      dialogVisible: false,
      orderHistory: [],
      orderItems: [],
    };
  },
  mounted(){
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      await axiosInstance.request({
            method: 'post',
            url: 'orders/get_order_list/',
            data: {}
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data);
              if(response.data.code == '200')
              {
                this.orderHistory = response.data.data.orders;
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
    },
    async getOrderDetails(item) {
      await axiosInstance.request({
            method: 'post',
            url: 'orders/get_order_details/',
            data: {
              order_id: item.order_id,
            }
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data);
              if(response.data.code == '200')
              {
                this.orderItems = response.data.data.orderdetails;
                console.log(this.orderItems);
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
    },
    async viewOrder(order) {
      console.log(order.order_id);
      await this.getOrderDetails(order);
      this.dialogVisible = true;
    },
    closeDialog() {
      this.dialogVisible = false;
    }
  }
};
</script>
  
<style>
.profile {
  margin: 20px;
}
  
.profile h2 {
  margin-bottom: 20px;
}
  
.profile-info {
  margin-bottom: 20px;
}
  
.info-item {
  margin-bottom: 10px;
}
  
.label {
  font-weight: bold;
  margin-right: 10px;
}
  
.order-history {
  margin-top: 20px;
}
</style>
  