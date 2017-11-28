<template>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="ID" width="180" prop="id"></el-table-column>
        <el-table-column label="用户名" width="180" prop="username"></el-table-column>
        <el-table-column label="密码" width="180" prop="password"></el-table-column>
        <el-table-column label="操作" width="180">
            <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="changePW(scope.row)">修改</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import {getAdminList} from '../api/api'
    export default {
        name:'AdminList',
        created(){
          this.getAdmins();
        },
        data(){
          return{
              tableData:[],
          }
        },
        methods:{
          getAdmins(){
              getAdminList({}).then((res) =>{
                  console.log(res);
                  sessionStorage.setItem("AdminList",res.data.Admins);
                  this.tableData=res.data.Admins;
              })
          }
        },
    }
</script>

<style scoped>

</style>