import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Paraules from '@/components/Paraules'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/paraules',
      name: 'paraules',
      component: Paraules
    }
  ]
})
