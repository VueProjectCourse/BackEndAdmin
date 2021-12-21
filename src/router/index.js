import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 导入页面组件

import Home from "@/views/Home/Home.vue"
import Login from "@/views/Login/Login.vue"
// 导入其他页面组件
import Users from "@/components/Users/Users.vue"
import Rights from "@/components/Rights/Rights.vue"
import Goods from "@/components/Goods/Goods.vue"
import Orders from "@/components/Orders/Orders.vue"
import Settings from "@/components/Settings/Settings.vue"
import UserInfo from "@/components/Users/UserInfo.vue"
const routes = [
  {
    path: '/',
    redirect: "/home"
  },
  // Home组件
  {
    path: "/home",
    component: Home,
    children: [
      { path: '/', redirect: "users"},
      { path: 'users', component: Users },
      { path: 'rights', component: Rights },
      { path: 'goods', component: Goods },
      { path: 'orders', component: Orders },
      { path: 'settings', component: Settings },
      { path: 'userinfo/:id', name: "userinfo", component: UserInfo, props: true },
    ]
  },
  // Login组件
  {
    path: "/login",
    component: Login
  }

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 
let arr = ['/home', '/home/users', '/home/rights']
router.beforeEach(function (to, from, next) {
  if (arr.indexOf(to.path) !== -1) {
    // 需要权限才可以访问
    const token = localStorage.getItem('token');
    if (token) {
      next()
    } else {
      next("/login")
    }
  } else {
    //不需要权限也可以访问
    next()
  }
})

export default router
