<template>
    <div>
        <el-row>
            <el-col :span="2">
                <div class="grid-content bg-purple">
                    <el-button  type="danger" @click="addAdmin()">新增用户</el-button>
                </div>
            </el-col>
        </el-row>
        <my-dialog :formVisible="addFormVisible" :form="addForm" @on-confirm="pushAdmin()" @on-cancel="cancelAdd()"></my-dialog>

        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column type="index" width="60" header-align="center"></el-table-column>
            <!--<el-table-column label="ID" width="180" prop="id"></el-table-column>-->
            <el-table-column label="用户名" width="180" prop="username" header-align="center"></el-table-column>
            <el-table-column label="邮箱" width="180" prop="email" header-align="center"></el-table-column>
            <el-table-column label="密码" width="180" prop="password" header-align="center"></el-table-column>
            <el-table-column label="类型" width="180" prop="type" header-align="center"></el-table-column>
            <el-table-column label="操作" width="180" header-align="center">
                <template slot-scope="scope" >
                    <el-button type="danger" size="mini" v-if="!(this.LoginUser=== scope.row.username)" @click="changeProfile(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <p>{{$store.state.count}}</p>
        <el-button @click="$store.commit('add')">+</el-button><el-button @click="$store.commit('reduce')">-</el-button>
    </div>
</template>

<script>
    import {getAdminList,reqChangeProfile,addAdmin} from '../api/api'

    import AdminProfileDialog from '../components/adminProfileDialog.vue'

    import store from '../store/index'

    export default {
        name:'AdminList',
        components:{
          myDialog:AdminProfileDialog,
        },
        created(){
            this.getAdmins();
        },
        data(){

            return{
                LoginUser:'',
                tableData:[],
                dialogFormVisible: false,
                addFormVisible:false,
                formLabelWidth:'180px',
                modifyForm: {
                    id:'',
                    username: '',
                    password: '',
                    email:'',
                    type:'',
                },
                addForm: {
                    id:'',
                    username: '',
                    password: '',
                    email:'',
                    type:'',
                },
            }
        },
        methods:{
            cancelAdd(){
                this.addFormVisible=false;
            },
            getAdmins(){
                getAdminList({}).then((res) =>{
                    console.log(res);
                    this.tableData=res.data.Admins;
                })
            },
            changeProfile(row){
                if(row.username===this.LoginUser){
                    this.$message({
                        message: '请至左侧导航栏 系统设置—个人信息处修改！',
                        type: 'warning'
                    })
                }else {
                    this.dialogFormVisible = true;
                    this.modifyForm.id = row.id;
                    this.modifyForm.username = row.username;
                    this.modifyForm.email = row.email;
                    this.modifyForm.password = row.password;
                    this.modifyForm.type = row.type;
                }
            },
            modifyProfile(){
                let id = this.modifyForm.id;
                let username = this.modifyForm.username;
                let password = this.modifyForm.password;
                let type = this.modifyForm.type;
                let email = this.modifyForm.email;
                var para = {id,username,password,type,email};
                reqChangeProfile(para).then((res) =>{
                    let {msg, code} = res;
                    console.log(code);
                    if (code === 200) {
                        this.$message({
                            message: msg,
                            type: 'success'
                        })
                    };
                    this.getAdmins();
                });
                this.dialogFormVisible = false;
            },
            addAdmin(){
                this.addFormVisible = true;
            },
            pushAdmin(){
                let username = this.addForm.username;
                let password = this.addForm.password;
                let type = this.addForm.type;
                let email = this.addForm.email;
                let para = {username,password,type,email};
                addAdmin(para).then((res)=>{
                    let {msg, code} = res;
                    console.log(res);
                    if (code === 200) {
                        this.$message({
                            message: msg,
                            type: 'success'
                        })
                    };
                    this.addFormVisible = false;
                    this.addForm={};
                    this.getAdmins();
                });
            }
        },
        mounted() {
            let admin = sessionStorage.getItem('access-user');
            if (admin) {
                admin = JSON.parse(admin);
            }
            this.LoginUser = admin.username;
            console.log(this.$store);
        },
    }
</script>

<style scoped>

</style>
