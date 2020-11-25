<template>
 <div class="dictionary-wrapper">
    数据字典
    <el-tabs type="border-card" class="dictionary-list">
        <el-tab-pane :label="item.label" v-for="item,index in list" :key="index">
           <dictionary-list :type="item.type"></dictionary-list>
        </el-tab-pane>
    </el-tabs>
 </div>
</template>
<script>
import DictionaryList from '@/components/DictionaryList.vue'
export default{
    data(){
        return {
            list:[{
                label:"未入库设备状态",
                type:"preStatusList"
            },
            {
                label:"已入库设备状态",
                type:"equipStatusList"
            },
            {
                label:"设备分类",
                type:"categoryList"
            }]
        }
    },
    created(){

    },
    components:{
        'dictionary-list':DictionaryList
    }
}
</script>
<style lang="sass">
.dictionary-wrapper 
    padding-right: 20px
    


</style>