<template>
    <el-form :model="pwform" :rules="rules" status-icon ref="pwform" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" :label-width="formLabelWidth" prop="oldPassword">
            <el-input v-model="pwform.oldPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
            <el-input v-model="pwform.newPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="confirmPassword">
            <el-input v-model="pwform.confirmPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('pwform')">确认修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {reqLogin,reqChangeAdminPW} from '../api/api'

export default {
    name:'ChangePassword',
    data(){
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
            formLabelWidth:'180px',
            pwform:{
                oldPassword:'',
                newPassword:'',
                confirmPassword:'',
            },
            rules: {
                newPassword: [
                    { required: true,validator: checkPassword, trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true,validator: checkPassword, trigger: 'blur' }
                ],
                oldPassword: [
                    { required: true,validator: checkPassword, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let id = this.LoginUser.id;
                    let username = this.LoginUser.username;
                    let password = this.pwform.oldPassword;
                    let newPassword = this.pwform.newPassword;
                    let params = {username,password};
                    console.log(params);
                    reqLogin(params).then((res)=>{
                        console.log(res);
                        if(res.code===200){
                            if(this.pwform.newPassword===this.pwform.confirmPassword){
                                let newParams ={id,username,newPassword};
                                reqChangeAdminPW(newParams).then((res)=>{
                                    if(res.code===200){
                                        console.log('yes！');
                                        this.$alert('密码修改成功，请重新登陆', '密码修改成功！', {
                                            confirmButtonText: '重新登陆',
                                            showClose:false,
                                            callback: action => {
                                                this.$router.push({path:'/login'});
                                            }
                                        });
                                    }else{
                                        this.$message({
                                            type: 'error',
                                            message: '密码修改失败，请联系技术支持！'
                                        });
                                    }
                                })
                            }else {
                                this.$message({
                                    message:'确认密码与新密码不一致',
                                    type:'error',
                                });
                            }
                        }else {
                            this.$message({
                               message:'旧密码错误！',
                                type:'error',
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    mounted(){
        let admin = sessionStorage.getItem('access-user');
        if (admin) {
            admin = JSON.parse(admin);
        }
        this.LoginUser = admin;
    },
}
</script>

<style scoped>

</style>
