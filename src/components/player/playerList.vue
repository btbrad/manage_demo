<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="ID" width="180" prop="id"></el-table-column>
        <el-table-column label="用户名" width="180" prop="username"></el-table-column>
        <el-table-column label="性别" width="180" prop="sex"></el-table-column>
        <el-table-column label="密码" width="180" prop="password"></el-table-column>
        <el-table-column label="操作" width="180">
            <template slot-scope="scope">
                <el-button type="danger" size="mini">修改密码</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {getPlayerList} from '../../api/api'

export default {
    name:'PlayerList',
    created(){
        getPlayerList({}).then(res =>{
            console.log(res);
            sessionStorage.setItem("PlayerList",res.data.players);
            this.tableData = res.data.players;
        })
    },
    data(){
        return{
            tableData:[],
        }
    },
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
