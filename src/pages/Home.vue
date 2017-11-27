<template>
    <h1>欢迎{{username}}</h1>
</template>

<script>
    export default {
        name:'Home',
        data(){
            return{
                username:'',
            }
        },
        methods:{

        },
        mounted(){
            let admin = sessionStorage.getItem('access-user');
            if(admin){
                admin = JSON.parse(admin);
            }
            this.username = admin.username;
        }
    }
</script>

<style scoped>

</style>