<template>
    <div>
        <el-row>
        <el-col :span="2">
            <div class="grid-content bg-purple">
                <el-button  type="danger" @click="addAdmin()" justify="start">新增用户</el-button>
            </div>
        </el-col>
    </el-row>
        <el-dialog title="新增用户" :visible.sync="addFormVisible">
            <el-form :model="addForm" :rules="rules" status-icon>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮  箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密  码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类  型" :label-width="formLabelWidth" prop="type">
                    <el-select v-model="addForm.type" placeholder="请选择用户类型" style="width: 100%;">
                        <el-option label="super" value="super"></el-option>
                        <el-option label="normal" value="normal"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushAdmin()">确 定</el-button>
            </div>
        </el-dialog>

        <!--用户列表-->
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
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="modifyForm" :rules="rules" status-icon>
                <el-form-item label="ID" :label-width="formLabelWidth" prop="id">
                    <el-input v-model="modifyForm.id" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="modifyForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮  箱" :label-width="formLabelWidth" prop="email">
                    <el-input v-model="modifyForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密  码" :label-width="formLabelWidth" prop="password">
                    <el-input v-model="modifyForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类  型" :label-width="formLabelWidth" prop="type">
                    <el-select v-model="modifyForm.type" placeholder="请选择用户类型" style="width: 100%;">
                        <el-option label="super" value="super"></el-option>
                        <el-option label="normal" value="normal"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyProfile()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getAdminList,reqChangeProfile,addAdmin} from '../api/api'

    export default {
        name:'AdminList',
        created(){
          this.getAdmins();
        },
        data(){
            var checkUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                setTimeout(() => {
                    if(!/^GM[123][0-9]{3}$/g.test(value))
                    {
                        callback(new Error('用户名格式不正确'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                }
                setTimeout(() => {
                    if(!/^\w{6,}$/g.test(value))
                    {
                        callback(new Error('密码不能低于6位'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
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
              rules:{
                  username: [
                      { required: true,validator: checkUsername, trigger: 'blur' }
                  ],
                  password: [
                      { required: true, validator: checkPassword, trigger: 'blur' },
                  ],
                  email:[
                      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                      { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                  ],
                  type:[
                      { required: true, message: '请选择管理员类型', trigger: 'change' },
                  ]
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
                var para = {username,password,type,email};
                addAdmin(para).then((res)=>{
                    let {msg, code} = res;
                    console.log(res);
                    if (code === 200) {
                        this.$message({
                            message: msg,
                            type: 'success'
                        })
                    };
                    this.getAdmins();
                    this.addFormVisible = false;
                });
            }
        },
        mounted() {
            let admin = sessionStorage.getItem('access-user');
            if (admin) {
                admin = JSON.parse(admin);
            }
            this.LoginUser = admin.username;
        },
    }
</script>

<style scoped>

</style>
