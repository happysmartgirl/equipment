<template lang="pug">
.main-wrapper 
    template(v-if="isLogin")
        top-header
        .main
            menu-bar
            .content
                router-view
</template>
<script>
import MenuBar from '@/components/MenuBar.vue'
import TopHeader from '@/components/TopHeader.vue'
import axios from 'axios'
    export default{
        data(){
           return{
               isLogin: false,
           }
        },
        methods: {
            getBaseInfo(){
                return Promise.all([
                    axios.get('/equipment/status-list?type=pre'),
                    axios.get('/equipment/status-list?type=equip'),
                    axios.get('/equipment/category-list')
                ]).then(rsp=>{
                    const preStatusList = rsp[0].data;
                    const equipStatusList = rsp[1].data;
                    const categoryList = rsp[2].data;
                    this.$store.commit('setPreStatusList',preStatusList.data);
                    this.$store.commit('setEquipStatusList',equipStatusList.data);
                    this.$store.commit('setCategoryList',categoryList.data);
                })
            },
            who(){
                axios.get('/equipment/who').then(({data})=>{
                    if(!data.code){
                        this.$store.commit('setUsername',data.data.name)
                        this.$store.commit('setPermissions',data.data.permissions)
                        
                        this.getBaseInfo().then(()=>{
                            this.isLogin = true
                        })
                    }else{
                        this.$router.push('/login')
                    }
                })
            }
        },
        components:{
            'menu-bar':MenuBar,
            'top-header':TopHeader
        },
        created(){
            this.who();
           
        }
    }
</script>
<style lang="sass" scoped>
.content
    position: fixed
    top: 60px
    right: 0
    left: 210px
    overflow-y: scroll
    bottom: 0

    
</style>