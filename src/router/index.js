import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'home',
      component: Home
    },
    {
      path: '/places/:id(\\d+)?',
      name: 'place',
      component: Home,
      props: true
    }
  ]
})

export default router
