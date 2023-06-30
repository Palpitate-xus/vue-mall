<template>
    <div class="profile">
      <h3>地址管理</h3>
      <el-button>添加地址</el-button>
      <el-table :data="addresses" style="width: 100%">
        <el-table-column prop="addressId" label="地址ID"></el-table-column>
        <el-table-column prop="receiver" label="收货人"></el-table-column>
        <el-table-column prop="province" label="省"></el-table-column>
        <el-table-column prop="city" label="市"></el-table-column>
        <el-table-column prop="address" label="收货地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editAddress(scope.row)">修改地址</el-button>
            <el-button type="text" size="mini" @click="removeFromAddress(scope.row)">删除地址</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddressManagement',
    data() {
      return {
        addresses: [
          {
            addressId: 'ADD001',
            receiver: 'test receiver001',
            province: 'test province001',
            city: 'test city001',
            address: 'test address001'
          },
          {
            addressId: 'ADD002',
            receiver: 'test receiver002',
            province: 'test province002',
            city: 'test city002',
            address: 'test address002'
          },
        ]
      };
    },
    methods: {
      removeFromAddress(item) {
        const index = this.addresses.indexOf(item);
        if (index !== -1) {
          this.addresses.splice(index, 1);
      }
    },
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
  