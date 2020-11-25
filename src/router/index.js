import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login.vue'
import about from '@/views/about.vue'
import overview from '@/views/OverView.vue'
import register from '@/views/register.vue'
import dictionary from '@/views/dictionary.vue'
import management from '@/views/management.vue'
import RegisterDetail from '@/views/RegisterDetail.vue'
import ManagementDetail from '@/views/ManagementDetail.vue'
import RegisterAdd from '@/views/RegisterAdd.vue'
import RegisterEdit from '@/views/RegisterEdit.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      //直接跳转到/login
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/about',
      name: 'about',
      component: about,
      children:[
        {
          path: 'overview',
          name: 'overview',
          component: overview
        },
        {
          path: 'register',
          name: 'register',
          component: register
        },
        {
          path: 'dictionary',
          name: 'dictionary',
          component: dictionary
        },
        {
          path: 'management',
          name: 'management',
          component: management
        },
        {
          path: 'registerdetail/:id',
          name: 'registerdetail',
          component: RegisterDetail
        },
        {
          path: 'managementdetail/:id',
          name: 'managementdetail',
          component: ManagementDetail
        },
        {
          path: 'registeradd',
          name: 'registeradd',
          component: RegisterAdd
        },
        {
          path: 'registeredit/:id',
          name: 'registeredit',
          component: RegisterEdit
        },
      ]
    }
  ]
})

export default router
