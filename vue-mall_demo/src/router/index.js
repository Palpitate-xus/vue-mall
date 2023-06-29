import Vue from 'vue'
import Router from 'vue-router'
import Products from '../components/Products'
import Cart from '../components/Cart'
import PersonalCenter from '../components/PersonalCenter'
import MallIndex from '../components/MallIndex'
import OrderManagement from '../components/OrderManagment'
import AddressManagement from '../components/AddressManagement'
import Login from '../components/Login'
import ForgotPassword from '../components/ForgotPassword'
import Register from '../components/Register'
import Checkout from '../components/Checkout'
import Payment from '../components/Payment'
import PaymentSuccess from '../components/PaymentSuccess'
import PaymentFail from '../components/PaymentFail'
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
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/forgotPassword',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/payment/success',
      name: 'PaymentSuccess',
      component: PaymentSuccess
    },
    {
      path: '/payment/fail',
      name: 'PaymentFail',
      component: PaymentFail
    },
    
    // {
    //   path: '/helloworld',
    //   name: 'profile',
    //   component: Profile
    // }
  ]
})
