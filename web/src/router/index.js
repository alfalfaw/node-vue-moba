import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Main from '../views/Main'
import Article from '../views/Article'
import Hero from '../views/Hero'
Vue.use(VueRouter)

const routes = [
  {
    path: '/heros/:id',
    component: Hero,
    props: true
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/articles/:id',
        name: 'article',
        component: Article,
        props: true
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
