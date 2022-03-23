import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/modules/auth/Login'
import dashboard from '@/modules/dashboard/_views/Dashboard'
Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: { layout: 'auth', requiresAuth: true }
    },
    // {
    //   path: 'dashboard',
    //   name: 'dashboard',
    //   component: dashboard,
    //   meta: { layout: 'auth', requiresAuth: true }
    // },
    {
      path: '/thong-bao',
      name: 'ViewNoticeAll',
      component: dashboard,
      meta: { layout: 'auth', requiresAuth: true },
      props: {
        template: 'ViewNoticeAll'
      }
    }
  ]
})
