<template>
	<el-form :model="loginForm" :rules="rules" status-icon ref="loginForm" label-width="100px" class="loginForm demo-ruleForm">
        <h1>欢  迎</h1>
		<el-form-item label="用户名" prop="username">
			<el-input type="text" v-model="loginForm.username" id="username"></el-input>
		</el-form-item>
        <el-form-item label="密  码" prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off" id="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
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
                loginForm:{
                    username:'',
                    password:'',
				},
                fullscreenLoading: false,
                rules:{
                    username: [
                        { required: true,validator: checkUsername, trigger: 'blur' }
                    ],
                    password: [
                        { required: true, validator: checkPassword, trigger: 'blur' },
                    ],
                }
			}
		},
        methods:{
            submitForm(formName) {
                this.fullscreenLoading = true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
//                        let loginParams = {username:this.loginForm.username,password:this.loginForm.password};
//                        console.log(loginParams);
//                        reqLogin(loginParams).then(data =>{
//                            console.log(data);
//                            let {msg,code,admin} = data;
//                            if(code!==200){
//                                this.fullscreenLoading = false;
//                                this.$message({
//                                    message:'密码错误',
//                                    type:'error'
//                                })
//                            }else {
//                                sessionStorage.setItem('access-user',JSON.stringify(admin));
//                                console.log('login success');
//                                this.$router.push({ path:'/index' });
//                            }
//                        })
                        this.$store.dispatch('Login',this.loginForm).then((res) =>{
                            console.log(res);
                            let {code,msg} = res;
                            if(code===200){
                                this.$router.push({path:'/index'});
                                this.$message({
                                    type: 'success',
                                    message: '登录成功跳转到首页...'
                                });

                            }else {
                                this.$message({
                                    type:'error',
                                    message:msg
                                });
                                this.fullscreenLoading = false;
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        this.fullscreenLoading = false;
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
