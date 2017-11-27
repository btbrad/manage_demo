<template>
	<el-form :model="loginForm" :rules="rules" status-icon ref="loginForm" label-width="100px" class="loginForm demo-ruleForm">
        <h1>欢  迎</h1>
		<el-form-item label="用户名" prop="username">
			<el-input type="text" v-model="loginForm.username"></el-input>
		</el-form-item>
        <el-form-item label="密  码" prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
    import {reqLogin} from '../api/api'

	export default{
		name:'Login',
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
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
			return{
                loginForm:{
                    username:'',
                    password:'',
				},
                rules:{
                    username: [
                        { required: true,validator: checkUsername, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                }
			}
		},
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                        let loginParams = {username:this.loginForm.username,password:this.loginForm.password};
                        console.log(loginParams);
                        reqLogin(loginParams).then(data =>{
                            console.log(data);
                            let {msg,code,admin} = data;
                            if(code!==200){
                                this.$message({
                                    message:msg,
                                    type:'error'
                                })
                            }else {
                                sessionStorage.setItem('access-user',JSON.stringify(admin));
                                console.log('login success');
                                this.$router.push({ path:'/' });
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
        }
	}
</script>

<style scoped>
.loginForm{
    width: 500px;
    margin:20% auto;
}
h1{
    width: 100px;
    margin: 0 250px 20px;
}
.el-button{
    margin: 0 150px;
}
</style>
