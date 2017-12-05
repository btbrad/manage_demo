<template>
    <div>
        <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-select v-model="selectValue" slot="prepend" placeholder="请选择" style="width: 100px;">
                    <el-option label="ID" value="id"></el-option>
                    <el-option label="用户名" value="username"></el-option>
                    <el-option label="性别" value="sex"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
    <el-table :data="tableData" border height="800" fit style="width: 100%">
        <el-table-column  fixed label="ID" width="180" prop="id" header-align="center"></el-table-column>
        <el-table-column  fixed label="用户名" width="180" prop="username" header-align="center"></el-table-column>
        <el-table-column label="性别" width="180" prop="sex" header-align="center"></el-table-column>
        <el-table-column label="密码" width="180" prop="password" header-align="center"></el-table-column>
        <el-table-column label="操作" width="180" header-align="center">
            <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="changePW(scope.row)">修改密码</el-button>
            </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
import {getPlayerList,reqChangePW} from '../../api/api'

export default {
    name:'PlayerList',
    created(){
        this.getPlayers();
    },
    data(){
        return{
            tableData:[],
            input3: '',
            input4: '',
            input5: '',
            selectValue: ''
        }
    },
    methods:{
        changePW(row){
            console.log(row);
            this.$confirm('确认更改此玩家的密码？','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.$prompt('请输入新密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputPattern: /^\w{6,}$/,
                    inputErrorMessage: '密码不得低于6个字符！'
                }).then(({ value }) => {
//                    this.$message({
//                        type: 'success',
//                        message: '你的邮箱是: ' + value
//                    });
                    let id = row.id;
                    let username=row.username;
                    let password = value;
                    let para = {id,username,password};
                    console.log(para);
                    reqChangePW(para).then((res) =>{
                        console.log(res);
                        let {msg, code} = res;
                        console.log(code);
                        if (code === 200) {
                            this.$message({
                                message: msg,
                                type: 'success'
                            })
                        };
                        this.getPlayers();
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消更改'
                });
            });
        },
        getPlayers(){
            getPlayerList({}).then(res =>{
                console.log(res);
                this.tableData = res.data.players;
            })
        },
    }
}
</script>

<style scoped>
    .head{
        height: 50px;
    }
    .el-select .el-input {
        width: 130px;
    }
    el-input.el-input--suffix{
        width: 100px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>
