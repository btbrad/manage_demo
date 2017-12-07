import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Login from '../pages/Login.vue'
import Test from '../pages/test.vue'
import Home from '../pages/Home.vue'
import Welcome from '../components/welcome.vue'
import PlayerList from '../components/player/playerList.vue'
import AdminList from '../components/adminList.vue'
import AdminProfile from '../components/adminProfile.vue'
import ChangePassword from '../components/changePassword.vue'

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
            children:[
                {
                    path:'/index',
                    name:'欢迎页',
                    component:Welcome,
                    meta:{
                        needLogin:true
                    },
                },
                {
                    path:'/PlayerList',
                    name:'玩家列表页',
                    component:PlayerList,
                    meta:{
                        needLogin:true
                    },
                },
                {
                    path:'/AdminList',
                    name:'管理员列表页',
                    component:AdminList,
                    meta:{
                        needLogin:true
                    },
                },
                {
                    path:'/adminProfile',
                    name:'管理员个人信息页',
                    component:AdminProfile,
                    meta:{
                        needLogin:true
                    },
                },
                {
                    path:'/changePassword',
                    name:'管理员修改密码页',
                    component:ChangePassword,
                    meta:{
                        needLogin:true
                    },
                },
            ]
        },
    ]
});

router.beforeEach((to,from,next) =>{
   if(to.meta.needLogin){
       let admin = store.getters.accessUser;
        console.log(admin);
       // let admin = JSON.parse(window.sessionzStorage.getItem('access-user'));
       if((!admin)||(admin.id==='')||(admin.username==='')){
           next({path:'/login'})
       }
       next()
   }else{
       // window.sessionStorage.removeItem('access-user');
       store.commit('updateAccessUser','');
       next()
   }
});

export default router;
