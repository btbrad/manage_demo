<template>
    <el-form :model="accessUser" :rules="rules" status-icon ref="AdminProfileForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="accessUser.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮  箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="accessUser.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('AdminProfileForm')">确认更改</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {mapGetters} from 'vuex'
import {reqLogin,reqChangeAdminProfile} from '../api/api'

export default {
    name:'AdminProfile',
    data(){
        return{
//            AdminProfileForm: {
//                id:'',
//                username: '',
//                password: '',
//                email:'',
//            },
            formLabelWidth:'200px',
            rules:{
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
                ]
            }
        }
    },
    computed:{
        ...mapGetters([
                'accessUser'
            ])
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let id = this.accessUser.id;
                    let username = this.accessUser.username;
                    let email = this.accessUser.email;
                    let params = {id,username,email};
                    reqChangeAdminProfile(params).then((res) =>{
                        let {code} = res;
                        if(code===200){
                            this.$message({
                                type:'success',
                                message:'修改成功！'
                            })
                        }else{
                            this.$message({
                                type:'error',
                                message:'修改失败！'
                            })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    mounted() {
//        let admin = sessionStorage.getItem('access-user');
//        if (admin) {
//            admin = JSON.parse(admin);
//        }
//        this.AdminProfileForm = accessUser;
//        this.AdminProfileForm=this.$store.getters.accessUser;
//        console.log(this.AdminProfileForm);

    }
}
</script>

<style scoped>

</style>
