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
                <el-row>
                    <el-col :span="24">
                        <el-menu
                                router
                                default-active="2"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose">
                            <el-menu-item index="/index">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>系统首页</span>
                                </template>
                            </el-menu-item>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span>玩家管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/PlayerList">玩家列表</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="">
                                <template slot="title">
                                    <i class="el-icon-setting"></i>
                                    <span>系通设置</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item v-if="this.UserType==='超级管理员'" index="/AdminList">管理员列表</el-menu-item>
                                    <el-menu-item index="/adminProfile">个人信息</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return {
                username: '',
                UserType:'',
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
        },
        mounted() {
                let admin = sessionStorage.getItem('access-user');
                if (admin) {
                    admin = JSON.parse(admin);
                }
                this.username = admin.username;
                this.UserType = admin.type;
                console.log(this.UserType);
            }
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
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
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
