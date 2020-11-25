<template lang="pug">
.menu-bar
    ul
        li(v-for="(item,index) in permissionNavList" :key="index")
            router-link(:to="item.url") {{item.label}}
</template>
<script>
export default{
    data(){
        return{
            navList:[
                {
                    label:'系統橄欖',
                    url:'/about/overview'
                },
                {
                    label:'设备登记',
                    url:'/about/register'
                },
                {
                    label:'设备管理',
                    url:'/about/management'
                },
                {
                    label:'数据字典',
                    url:'/about/dictionary'
                }
            ],

        }
    },
    methods: {

    },
    created(){

    },
    computed:{
        permissionNavList(){
            return this.navList.filter((item)=>{
                const str = item.url.substr(item.url.lastIndexOf('/')+1)
                return this.$store.state.permissions.indexOf(str) > -1
            })
        }
    }
}
</script>
<style lang="sass">
.menu-bar
    width: 190px
    font-size: 14px
    line-height: 30px
    background: #364259
    color: #fff
    height: 100%
    text-align: center
    height: calc(100vh - 60px)
    ul
        padding: 10px
        a
            line-height: 42px
            padding: 0 15px
            border-radius: 4px
            &.router-link-exact-active
                background: #47546c
</style>
