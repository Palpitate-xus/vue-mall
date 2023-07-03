<template>
    <div class="profile">
      <h3>地址管理</h3>
      <el-button class="add" icon="el-icon-plus" @click="addAddress">添加地址</el-button>
      <el-table :data="addresses" style="width: 100%">
        <!-- <el-table-column prop="address_id" label="地址ID"></el-table-column> -->
        <el-table-column prop="recipient_name" label="收货人"></el-table-column>
        <el-table-column prop="phone_number" label="联系方式"></el-table-column>
        <el-table-column prop="province" label="省"></el-table-column>
        <el-table-column prop="city" label="市"></el-table-column>
        <el-table-column prop="street" label="收货地址"></el-table-column>
        <el-table-column prop="postal_code" label="邮政编码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editAddress(scope.row)">修改地址</el-button>
            <el-button type="text" size="mini" @click="removeFromAddress(scope.row)">删除地址</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogVisible" :title="dialogTitle" width="50%">
        <el-form :model="formData" >
          <el-form-item label="收货人">
            <el-input v-model="formData.recipient_name"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="formData.phone_number"></el-input>
          </el-form-item>
          <el-form-item label="省">
            <el-input v-model="formData.province"></el-input>
          </el-form-item>
          <el-form-item label="市">
            <el-input v-model="formData.city"></el-input>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-input v-model="formData.street"></el-input>
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="formData.postal_code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">{{ buttonTitle }}</el-button>
            <el-button @click="dialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import axiosInstance from '../api';
  export default {
    name: 'AddressManagement',
    data() {
      return {
        dialogTitle: '添加地址',
        addresses: [],
        dialogVisible: false,
        formData: {
          address_id: null,
          recipient_name: '',
          province: '',
          city: '',
          street: '',
          phone_number: '',
          postal_code: '',
        },
        buttonTitle: '',
      };
    },
    mounted() {
      const token = window.localStorage.getItem('token');
      console.log(token);
      if(token !== null){
        this.fetchAddresses();
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
      async removeFromAddress(item) {
        await axiosInstance.request({
          method: 'post',
          url: 'users/delete_address/',
          data: {
            address_id: item.address_id,
          }
        })
          .then(response => {
            // 处理响应数据
            console.log(response);
            console.log(response.data.data);
            if(response.data.code == '200')
            {
              const index = this.addresses.indexOf(item);
              if (index !== -1) {
                this.addresses.splice(index, 1);
              }
              this.$message({
                message: '删除成功',
                type: 'success'
              })
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
    addAddress() {
      this.dialogTitle = '创建地址';
      this.buttonTitle = '立即创建'
      this.formData = {
          address_id: null,
          recipient_name: '',
          province: '',
          city: '',
          street: '',
          phone_number: '',
          postal_code: '',
          is_default: 1,
        };
      this.dialogVisible = true;
    },
    editAddress(item) {
      this.dialogTitle = '修改地址';
      this.buttonTitle = '立即修改';
      this.formData = item;
      this.dialogVisible = true;
    },
    async onSubmit() {
      // 创建地址
      if(this.dialogTitle === '创建地址')
      {
        console.log('创建地址');
        await axiosInstance.request({
          method: 'post',
          url: 'users/create_address/',
          data: this.formData,
        })
          .then(response => {
            // 处理响应数据
            console.log(response);
            console.log(response.data.data);
            if(response.data.code == '200')
            {
              this.fetchAddresses();
              this.dialogVisible = false;
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
      else if(this.dialogTitle === '修改地址')
      {
        console.log('修改地址');
        this.removeFromAddress(this.formData);
        await axiosInstance.request({
          method: 'post',
          url: 'users/create_address/',
          data: this.formData,
        })
          .then(response => {
            // 处理响应数据
            console.log(response);
            console.log(response.data.data);
            if(response.data.code == '200')
            {
              this.fetchAddresses();
              this.dialogVisible = false;
              this.$message({
                message: '修改地址成功',
                type: 'success'
              })
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
    },
    async fetchAddresses() {
      await axiosInstance.request({
            method: 'post',
            url: 'users/addresslist/',
            data: {}
          })
            .then(response => {
              // 处理响应数据
              console.log(response);
              console.log(response.data.data);
              if(response.data.code == '200')
              {
                this.addresses = response.data.data.address;
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
  
  .add {
    text-align: left;
  }

  .label {
    font-weight: bold;
    margin-right: 10px;
  }
  
  .order-history {
    margin-top: 20px;
  }
  </style>
  