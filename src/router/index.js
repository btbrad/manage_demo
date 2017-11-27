import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Test from '../pages/test.vue'
import Home from '../pages/Home.vue'

Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/login',
            name:'登录',
            component:Login
        },
        {
            path:'/test',
            name:'测试',
            component:Test,
            meta:{
                needLogin:true
            },
        },
        {
            path:'/',
            name:'首页',
            component:Home,
            meta:{
                needLogin:true
            },
        },
    ]
});

router.beforeEach((to,from,next) =>{
   if(to.meta.needLogin){
       let admin = JSON.parse(window.sessionStorage.getItem('access-user'));
       if(!admin){
           next({path:'/login'})
       }
       next()
   }else{
       window.sessionStorage.removeItem('access-user');
       next()
   }
});

export default router;
