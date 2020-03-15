import Vue from 'vue'
import VueRouter from 'vue-router'

const TheContainer = () => import('../containers/TheContainer.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: 'device-list',
    component: TheContainer,
    children: [
      {
        path: 'device-list',
        name: 'Device List',
        redirect: 'device-list/index',
        component: {
          render (c: any) {
            return c('router-view')
          }
        },
        children: [
          {
            path: 'index',
            name: 'Device List',
            component: () => import('../views/Devices/DeviceList.vue')
          },
          {
            path: 'create',
            name: 'Device create',
            component: () => import('../views/Devices/DeviceCreate.vue')
          },
          {
            path: 'view/:id',
            name: 'Device view',
            component: () => import('../views/Devices/DeviceView.vue')
          },
          {
            path: 'update/:id',
            name: 'Device update',
            component: () => import('../views/Devices/DeviceUpdate.vue')
          }
        ]
      },
      {
        path: 'map',
        name: 'Map',
        component: () => import('../views/Map.vue')
      },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && !to.path.startsWith('/login')) {
    next({ path: '/login' })
  } else {
    return next()
  }
})

export default router
