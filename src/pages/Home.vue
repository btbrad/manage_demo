<template>
    <el-container>
        <el-header>
            <el-row :gutter="20">
                <el-col :span="6" :offset="8"><div class="grid-content bg-purple"><h1>后台管理系统</h1></div></el-col>
                <el-col :span="4" :offset="1"><div class="grid-content bg-purple"><p>已登录为<span class="access-user">{{username}}</span></p></div></el-col>
                <el-col :span="4" :offset="0"><div class="grid-content bg-purple"><el-button type="danger" class="quit_btn" @click="onQuit">退出登录</el-button></div></el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <!--<el-row>-->
                    <!--<el-col :span="24">-->
                        <!--<el-menu-->
                                <!--router-->
                                <!--default-active="2"-->
                                <!--class="el-menu-vertical-demo"-->
                                <!--@open="handleOpen"-->
                                <!--@close="handleClose">-->
                            <!--<el-menu-item index="/index">-->
                                <!--<template slot="title">-->
                                    <!--<i class="el-icon-location"></i>-->
                                    <!--<span>系统首页</span>-->
                                <!--</template>-->
                            <!--</el-menu-item>-->
                            <!--<el-submenu index="2">-->
                                <!--<template slot="title">-->
                                    <!--<i class="el-icon-menu"></i>-->
                                    <!--<span>玩家管理</span>-->
                                <!--</template>-->
                                <!--<el-menu-item-group>-->
                                    <!--<el-menu-item index="/PlayerList">玩家列表</el-menu-item>-->
                                <!--</el-menu-item-group>-->
                            <!--</el-submenu>-->
                            <!--<el-submenu index="">-->
                                <!--<template slot="title">-->
                                    <!--<i class="el-icon-setting"></i>-->
                                    <!--<span>系通设置</span>-->
                                <!--</template>-->
                                <!--<el-menu-item-group>-->
                                    <!--<el-menu-item @click="checkSuperAdmin" :index="adminLink">管理员列表</el-menu-item>-->
                                    <!--<el-menu-item index="/adminProfile">个人信息</el-menu-item>-->
                                    <!--<el-menu-item index="/changePassword">修改密码</el-menu-item>-->
                                <!--</el-menu-item-group>-->
                            <!--</el-submenu>-->
                        <!--</el-menu>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <!--<el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
                <my-nav></my-nav>
            </el-aside>
            <el-main>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {reqUserType} from '../api/api'
    import Nav from './nav.vue'

    export default {
        name: 'Home',
        components:{
            myNav:Nav,
        },
        data() {
            return {
                id:'',
                username: '',
                UserType:'',
                adminLink:'',
                navList:[
                    {
                        label:'系统首页',
                    },
                    {
                        label:'玩家管理',
                        children:[{
                            label:'玩家列表',
                        }],
                    },
                    {
                        label:'系统设置',
                        children:[
                            {
                                label:'管理员列表',
                             },
                            {
                                label:'个人信息',
                            },
                            {
                                label:'修改密码',
                            }
                        ],
                    }
                ],
            }
        },
        methods: {
            onQuit() {
                this.$confirm('退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.sessionStorage.removeItem('access-user');
                    console.log('清除session成功');
                    window.location.reload();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出登录'
                    });
                });
            },
            handleOpen(key, keyPath) {
            },
            handleClose(key, keyPath) {
            },
            checkSuperAdmin(){
                let id = this.id;
                let username = this.username;
                let params = {id,username};
                reqUserType(params).then((res) =>{
                    console.log(res);
                    let {code} = res;
                    if(code===200){
                        let Type = res.UserType;
                        if(Type==="super"){
                            this.adminLink='/AdminList';
                            return this.adminLink;
                        }else {
                            this.$message({
                                type:'error',
                                message:'没有权限'
                            })
                        }
                    }
                })
            }
        },
        mounted() {
//                let admin = sessionStorage.getItem('access-user');
//                if (admin) {
//                    admin = JSON.parse(admin);
//                }
//                this.id = admin.id;
//                this.username = admin.username;
                    this.username=this.$store.getters.username;
            },
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: auto;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

    .el-main {
        background-color: #fff;
        color: #333;
        text-align: center;
        line-height: 80px;
        min-height: 800px;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
    .access-user{
        color: #f00;
    }
    .quit_btn{
        margin-top: 10px;
    }
</style>
