import Vue from "vue";
import VueRouter from "vue-router";


//懒加载
const home = () => import('views/home/home');
const card = () => import('views/card/card');
const category = () => import('views/category/category');
const profile = () => import('views/profile/profile');


Vue.use(VueRouter);

const routes = [
    {
        path: '',
        redirect: '/home',
        meta: {
            title: '首页'
        }
    },
    {
        path: '/home',
        component: home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/card',
        component: card,
        meta: {
            title: '分类'
        }
    },
    {
        path: '/category',
        component: category,
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/profile',
        component: profile,
        meta: {
            title: '我的'
        }
    },

];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});
//路由导航
router.beforeEach((to,from,next)=>{
    document.title = to.matched[0].meta.title;
    next();
})


export default router;
