<template>
    <div>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="ID" width="180" prop="id"></el-table-column>
        <el-table-column label="用户名" width="180" prop="username"></el-table-column>
        <el-table-column label="性别" width="180" prop="sex"></el-table-column>
        <el-table-column label="密码" width="180" prop="password"></el-table-column>
        <el-table-column label="操作" width="180">
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
                    var para = {id,username,password};
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
    .el-table__header-wrapper{
        height: 125px;
    }
    .el-table th>.cell{
        text-align: center;
    }
</style>
