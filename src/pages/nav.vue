<template>
    <el-menu router>
        <nav-item
                v-for="(item, n) in navList"
                :item="item"
                :navIndex="String(n)"
                :key="n">
        </nav-item>
    </el-menu>
</template>

<script>
    import NavItem from './navItem.vue'
export default {
    name:'Nav',
    components:{
        navItem:NavItem,
    },
    data(){
      return{
          navList:[
              {
                  name:'系统首页',
                  path:'/index'
              },
              {
                  name:'玩家管理',
                  path:'',
                  children:[{
                      name:'玩家列表',
                      path:'/PlayerList'
                  }],
              },
              {
                  name:'系统设置',
                  path:'',
                  children:[
                      {
                          name:'管理员列表',
                          path:'/AdminList'
                      },
                      {
                          name:'个人信息',
                          path:'/adminProfile'
                      },
                      {
                          name:'修改密码',
                          path:'/changePassword'
                      }
                  ],
              },
          ],
      }
    },
    computed: {
        onRoutes(){
            return this.$route.path
        }
    },
}
</script>

<style scoped>

</style>
