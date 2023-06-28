import Vue from 'vue'
import Router from 'vue-router'
import Products from '../components/Products'
import Cart from '../components/Cart'
import PersonalCenter from '../components/PersonalCenter'
import MallIndex from '../components/MallIndex'
import OrderManagement from '../components/OrderManagment'
import AddressManagement from '../components/AddressManagement'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: MallIndex
    },
    {
      path: '/products',
      name: 'Products',
      component: Products
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/personalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/orderManagement',
      name: 'OrderManagement',
      component: OrderManagement
    },
    {
      path: '/addressManagement',
      name: 'AddressManagement',
      component: AddressManagement
    },
    // {
    //   path: '/helloworld',
    //   name: 'profile',
    //   component: Profile
    // }
  ]
})
