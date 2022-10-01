import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Home.vue'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/places/:id(\\d+)',
      name: 'place',
      component: Home,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      component: Home,
      props: {
        notFound: true
      },
    },
  ]
})
