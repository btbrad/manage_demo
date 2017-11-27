import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'

Vue.use(VueRouter);

let router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/login',
            name:'登录',
            component:Login
        },
    ]
})

export default router;
