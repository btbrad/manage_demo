<template>
    <el-dialog :title="title" :visible.sync="formVisible" :show-close=false :close-on-click-modal=false>
        <el-form :model="form" :rules="rules" :ref="form" status-icon>
            <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮  箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model="form.email" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密  码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="类  型" :label-width="formLabelWidth" prop="type">
                <el-select v-model="form.type" placeholder="请选择用户类型" style="width: 100%;">
                    <el-option label="super" value="super"></el-option>
                    <el-option label="normal" value="normal"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel()">取 消</el-button>
            <el-button type="primary" @click="submitFunc(form)">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name:'AdminProfileDialog',
    props:{
        title:'',
        form:{
            username:'',
            email:'',
            password:'',
            type:''
        },
        formVisible:{
            type:Boolean,
            default:false,
        },
        formLabelWidth:'',
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
        }
    },
    methods:{
        cancel(){
            this.$emit('on-cancel');
        },
        submitFunc(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('on-confirm');
                }else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
