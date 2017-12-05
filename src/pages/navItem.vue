<template>
    <el-submenu v-if="item.children && item.children.length" :index="navIndex">
        <!-- 创建父级菜单 -->
        <template slot="title">{{ item.name }}</template>
        <!-- 创建子菜单 -->
        <nav-item
                v-for="(subItem,i) in item.children"
                :key="navIndex+'-'+i"
                :navIndex="navIndex+'-'+i"
                :item="subItem" >
        </nav-item>
    </el-submenu>

    <el-menu-item v-else :index="item.path">{{ item.name }}</el-menu-item>
</template>

<script>
export default {
    name:'navItem',
    props: {
      item:'',
      navIndex:'',
    },
}
</script>

<style scoped>

</style>
