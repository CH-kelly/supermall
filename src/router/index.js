import Vue from "vue";
import VueRouter from "vue-router";


//懒加载
const home = ()=>import('views/home/home');
const card = ()=>import('views/card/card');
const category = ()=>import('views/category/category');
const profile = ()=>import('views/profile/profile');



Vue.use(VueRouter);

const routes = [
  {
    path:'',
    name:'首页',
    redirect:home
  },
  {
    path:'/home',
    name:'首页',
    component:home
  },
  {
    path:'/card',
    name:'分类',
    component:card
  },
  {
    path:'/category',
    name:'购物车',
    component:category
  },
  {
    path:'/profile',
    name:'我的',
    component:profile
  },
 
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
