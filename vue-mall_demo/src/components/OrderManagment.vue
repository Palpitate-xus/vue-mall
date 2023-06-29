<template>
  <div class="profile">
    <h3>订单</h3>
    <el-table :data="orderHistory" style="width: 100%">
      <el-table-column prop="orderId" label="订单号"></el-table-column>
      <el-table-column prop="date" label="时间"></el-table-column>
      <el-table-column prop="totalAmount" label="总金额"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="viewOrder(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
<script>
export default {
  name: 'OrderManagement',
  data() {
    return {
      orderHistory: [
        {
          orderId: 'ORD001',
          date: '2023-06-01',
          totalAmount: '$99.99'
        },
        {
          orderId: 'ORD002',
          date: '2023-05-20',
          totalAmount: '$49.99'
        },
        // Add more order history items here...
      ]
    };
  },
  methods: {
    viewOrder(order) {
      // Logic to view order details
      console.log(order.orderId);
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
  