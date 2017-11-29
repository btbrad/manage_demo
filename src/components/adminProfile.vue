<template>
    <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮  箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name:'AdminProfile',
    created(){
        let admin = sessionStorage.getItem('access-user');
        if (admin) {
            admin = JSON.parse(admin);
        }
        this.form = admin;
    },
    data(){
        return{
            form: {
                id:'',
                username: '',
                password: '',
                email:'',
                type:'',
            },
            formLabelWidth:'200px',
        }
    }
}
</script>

<style scoped>

</style>
