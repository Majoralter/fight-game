import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopVue from '@/views/Shop.vue'
import MyFightersVue from '@/views/MyFighters.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopVue
  },
  {
    path: '/my-fighters',
    name: 'MyFighters',
    component: MyFightersVue
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
