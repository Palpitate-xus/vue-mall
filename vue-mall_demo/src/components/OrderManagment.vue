<template>
  <div class="profile">
    <h3>订单</h3>
    <el-table :data="orderHistory" style="width: 100%">
      <el-table-column prop="order_id" label="订单号"></el-table-column>
      <el-table-column prop="order_time" label="下单时间"></el-table-column>
      <el-table-column label="支付状态" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag :type="row.payment_status === 'unpaid' ? 'danger' : 'success'">
            {{ row.payment_status === 'unpaid' ? '未支付' : '已支付'}}
          </el-tag>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="order_status" label="订单状态"></el-table-column> -->
      <el-table-column label="订单状态" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tag :type="getResult(row).type">
            {{ getResult(row).label }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="total_amount" label="总金额"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="viewOrder(scope.row)">查看详情</el-button>
          <el-button type="text" size="mini" @click="payOrder(scope.row)" v-if="scope.row.payment_status ===  'unpaid'">支付订单</el-button>
          <el-button type="text" size="mini" @click="confirmReceived(scope.row)" v-if="scope.row.status ===  'has shipped'">确认收货</el-button>
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
    <payment ref="payment"></payment>
  </div>
</template>
  
<script>
import axiosInstance from '../api';
import Payment from './Payment.vue';
export default {
    name: "OrderManagement",
    components: {
      Payment
    },
    data() {
        return {
            dialogVisible: false,
            orderHistory: [],
            orderItems: [],
        };
    },
    mounted() {
        const token = window.localStorage.getItem("token");
        console.log(token);
        if (token !== null) {
            this.getOrderList();
        }
        else {
            this.$router.push("/login");
            this.$notify({
                title: "未登录",
                message: "请先登录在线电子商务平台",
                type: "error"
            });
        }
        ;
    },
    methods: {
        async getOrderList() {
            await axiosInstance.request({
                method: "post",
                url: "orders/get_order_list/",
                data: {}
            })
                .then(response => {
                // 处理响应数据
                console.log(response);
                console.log(response.data.data);
                if (response.data.code == "200") {
                    this.orderHistory = response.data.data.orders;
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
        async getOrderDetails(item) {
            await axiosInstance.request({
                method: "post",
                url: "orders/get_order_details/",
                data: {
                    order_id: item.order_id,
                }
            })
                .then(response => {
                // 处理响应数据
                console.log(response);
                console.log(response.data.data);
                if (response.data.code == "200") {
                    this.orderItems = response.data.data.orderdetails;
                    console.log(this.orderItems);
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
        async viewOrder(order) {
            console.log(order.order_id);
            await this.getOrderDetails(order);
            console.log(this.orderItems);
            if (!this.orderItems) {
                this.$message({
                    message: "订单信息获取错误",
                    type: "error"
                });
            }
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
        payOrder(item) {
            this.$refs['payment'].generateQRCode(item);
            this.$refs['payment'].dialogVisible = true;
            console.log(item.order_id);
        },
        async confirmReceived(item) {
          console.log(item.order_id);
        },
        getResult(item) {
            console.log(item);
            switch (item.order_status) {
                case "Pending":
                    return { label: "待处理", type: "info" };
                case "has shipped":
                    return { label: "已发货", type: "warning" };
                case "Finished":
                    return { label: "已完成", type: "success" };
                default:
                    return { label: "订单信息获取错误", type: "danger" };
            }
        }
    },
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
  