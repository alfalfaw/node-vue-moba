import Vue from 'vue'
import App from './App.vue'

import router from './router'

import './assets/scss/style.scss'

// iconfont
import './assets/iconfont/iconfont.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper /* { default options with global component } */)

Vue.config.productionTip = false

import Card from './components/Card'
Vue.component('m-card', Card)
import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  // baseURL: 'http://localhost:3000/web/api'
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
