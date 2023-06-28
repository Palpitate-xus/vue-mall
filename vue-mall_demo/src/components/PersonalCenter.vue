<template>
    <div class="profile">
      <h2>个人中心</h2>
      <div class="profile-info">
        <div class="info-item">
          <span class="label">用户名:</span>
          <span class="value">{{ user.name }}</span>
        </div>
        <div class="info-item">
          <span class="label">邮箱:</span>
          <span class="value">{{ user.email }}</span>
        </div>
        <div class="info-item">
          <span class="label">地址:</span>
          <span class="value">{{ user.address }}</span>
        </div>
      </div>
      <h3>订单统计</h3>
      <el-table :data="orderHistory" style="width: 100%">
        <el-table-column prop="orderId" label="Order ID"></el-table-column>
        <el-table-column prop="date" label="Date"></el-table-column>
        <el-table-column prop="totalAmount" label="Total Amount"></el-table-column>
        <el-table-column label="Actions">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="viewOrder(scope.row)">View Details</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PersonalCenter',
    data() {
      return {
        user: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          address: '123 Main St, City, Country'
        },
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
        console.log('View order:', order.orderId);
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
  