<template>
	<el-form :model="loginForm" status-icon ref="loginForm" :rules="rules" label-width="100px" class="loginForm">
        <h1>欢  迎</h1>
		<el-form-item label="用户名" props="username">
			<el-input type="text" v-model="loginForm.username"></el-input>
		</el-form-item>
        <el-form-item label="密  码" props="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">登录</el-button>
        </el-form-item>
	</el-form>
</template>

<script>
	export default{
		name:'Login',
		data(){
			return{
                loginForm:{
                    username:'',
                    password:'',
				},
                rules:{
                    username: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                    ],
                }
			}
		}
	}
</script>

<style scoped>
.loginForm{
    width: 500px;
    margin:300px auto;
}
h1{
    width: 100px;
    margin: 0 250px 20px;
}
.el-button{
    margin: 0 150px;
}
</style>
