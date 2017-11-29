<template>
    <div>
        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-button  type="danger" @click="addAdmin()">新增用户</el-button>
                </div>
            </el-col>
        </el-row>
        <el-dialog title="新增用户" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮  箱" :label-width="formLabelWidth">
                    <el-input v-model="addForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密  码" :label-width="formLabelWidth">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类  型">
                    <el-select v-model="addForm.type" placeholder="请选择用户类型">
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="pushAdmin()">确 定</el-button>
            </div>
        </el-dialog>

        <!--用户列表-->
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" width="60"></el-table-column>
        <!--<el-table-column label="ID" width="180" prop="id"></el-table-column>-->
        <el-table-column label="用户名" width="180" prop="username"></el-table-column>
        <el-table-column label="邮箱" width="180" prop="email"></el-table-column>
        <el-table-column label="密码" width="180" prop="password"></el-table-column>
        <el-table-column label="类型" width="180" prop="type"></el-table-column>
        <el-table-column label="操作" width="180">
            <template slot-scope="scope" >
                <el-button type="danger" size="mini" v-if="!(this.LoginUser=== scope.row.username)" @click="changeProfile(scope.row)">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
            <el-form :model="modifyForm">
                <el-form-item label="ID" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.id" auto-complete="off" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮  箱" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密  码" :label-width="formLabelWidth">
                    <el-input v-model="modifyForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类  型">
                    <el-select v-model="modifyForm.type" placeholder="请选择用户类型">
                        <el-option label="普通管理员" value="普通管理员"></el-option>
                        <el-option label="超级管理员" value="超级管理员"></el-option>
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
                var para = {id,username,password,type};
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
                var para = {username,password,type};
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
