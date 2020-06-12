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

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
