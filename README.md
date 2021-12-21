# backend-admin

## 概述

本案例的目标是运用所学到的路由管理器的重点知识完成一个后台管理系统的简单功能。所用到的知识点有:

* 命名路由
* 路由重定向
* 导航守卫
* 嵌套路由
* 动态路由匹配
* 编程式导航

## 案例准备工作

1. 使用 Vue CLI 创建项目
2. 编写 Login 静态页面
3. 编写 Home 静态页面

## 功能一: Home页面

### 1.1 创建 侧边栏组件

```html
<div class="aside layout-aside-container">
    <!-- 左侧边栏列表 -->
    <ul class="user-select-none menu">
      <li class="menu-item">
      <a>用户管理</a>
      </li>
      <li class="menu-item">
        <a>权限管理</a>
      </li>
      <li class="menu-item">
        <a>商品管理</a>
      </li>
      <li class="menu-item">
        <a>订单管理</a>
      </li>
      <li class="menu-item">
        <a>系统设置</a>
      </li>
    </ul>
  </div>
```

```css
.layout-aside-container {
  width: 250px;
  height: 100%;
  border-right: 1px solid #eaeaea;
}

.menu {
  list-style-type: none;
  padding: 0;
}

.menu .menu-item {
  line-height: 50px;
  font-weight: bold;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.menu .menu-item:hover {
  background-color: #efefef;
  cursor: pointer;
}

.menu .menu-item a {
  display: block;
  color: black;
  padding-left: 30px;
}

.menu .menu-item a:hover {
  text-decoration: none;
}

/* 设置路由高亮效果 */
.router-link-active {
  background-color: #efefef;
  box-sizing: border-box;
  position: relative;
}
/* 伪元素实现路由高亮效果 */
.router-link-active::before {
  content: " ";
  display: block;
  width: 4px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #42b983;
}
```

### 1.2 创建 头部组件

```html
<div
    class="
      layout-header-container
      d-flex
      justify-content-between
      align-items-center
      p-3
    "
  >
    <!-- 左侧 logo 和 标题区域 -->
    <div class="layout-header-left d-flex align-items-center user-select-none">
      <!-- 标题 -->
      <h4 class="layout-header-left-title ml-3">
        <img width="30" height="30" src="https://getbootstrap.com/docs/4.6/assets/brand/bootstrap-solid.svg" alt=""> 后台管理系统
      </h4>
    </div>

    <!-- 右侧按钮区域 -->
    <div class="layout-header-right">
      <button type="button" class="btn btn-light">
        退出登录
      </button>
    </div>
  </div>
```

```css
.layout-header-container {
  height: 60px;
  border-bottom: 1px solid #eaeaea;
}

.layout-header-left-img {
  height: 50px;
}
```

### 1.3 渲染Home页面

```html
  <div class="home">
    <Header></Header>
    <div class="home-main-box">
      <Aside></Aside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body">
        
      </div>
    </div>
  </div>
```

```css
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.home-main-box {
  height: 100%;
  display: flex;
}

.home-main-body {
  padding: 15px;
  flex: 1;
}
```

### 1.4 点击侧边栏进行路由跳转

1. 配置路由表

```js
const routes = [
  // Home组件
  {
    path: "/home",
    component: Home,
    children: [
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
]
```

2. 配置router-link

```html
<ul class="user-select-none menu">
  <li class="menu-item">
  <!-- <a>用户管理</a> -->
  <router-link to="/home/users">用户管理</router-link>
  </li>
  <li class="menu-item">
    <!-- <a>权限管理</a> -->
     <router-link to="/home/rights">权限管理</router-link>
  </li>
  <li class="menu-item">
    <!-- <a>商品管理</a> -->
     <router-link to="/home/goods">商品管理</router-link>
  </li>
  <li class="menu-item">
    <!-- <a>订单管理</a> -->
     <router-link to="/home/orders">订单管理</router-link>
  </li>
  <li class="menu-item">
    <!-- <a>系统设置</a> -->
     <router-link to="/home/settings">系统设置</router-link>
  </li>
</ul>
```

3. 配置router-view

```html
<template>
  <div class="home">
    <Header></Header>
    <div class="home-main-box">
      <Aside></Aside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
```

## 功能二: 渲染 uers页面

```html
  <div class="users">
    <h3>用户页面</h3>
    <table class="table table-bordered table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>头衔</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>4</td>
          <td>赵姬</td>
          <td>48</td>
          <td>王太后</td>
          <td><a href="#">详情</a></td>
        </tr>
      </tbody>
    </table>
  </div>
```

```js
userlist: [
        { id: 1, name: "嬴政", age: 18, position: "始皇帝" },
        { id: 2, name: "李斯", age: 35, position: "丞相" },
        { id: 3, name: "吕不韦", age: 50, position: "商人" },
        { id: 4, name: "赵姬", age: 48, position: "王太后" },
      ]
```

## 功能三: 点击详情，跳转到用户详情

```js
  methods: {
    gotoDetail(id){

      this.$router.push({name: 'userinfo', params: {id}})
    }
  }
```

## 功能四: 用户登录

如果用户名是 admin 且密码是 666666 那么登录成功 存储token
并进行跳转

否则 移除token

```js
    login() {
      if (this.username === "admin" && this.password === "666666") {
        // 登录成功
        // 1. 存储 token
        localStorage.setItem("token", "Bearer xxxx");
        // 2. 跳转到后台主页
        this.$router.push("/home");
      } else {
        // 登录失败
        localStorage.removeItem("token");
      }
    },
```

## 功能五: 重置输入框

```js

reset() {
  this.username = "";
  this.password = "";
},
```

## 功能六: 登录跳转首页，没有登录，阻止跳转到首页

```js
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
```
