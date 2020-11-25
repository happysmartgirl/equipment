<template lang="pug">
    el-form(:model="searchForm" label-width="100px" label-position="right")
        el-form-item(label="设备状态" prop="status")
            el-input(v-model="searchForm.status")
        el-form-item(label="设备编号" prop="id")
            el-input(v-model="searchForm.id")
        el-form-item(label="设备名称" prop="name")
            el-input(v-model="searchForm.name")
        el-form-item(label="设备分类" prop="category")
            el-select(v-model="searchForm.category")
                el-option(v-for="item,id in $store.state.categoryList" :key="id" :label="item.name" :value="item.id")
        el-form-item
            el-button(type="primary" @click="search") 查询
</template>
<script>
export default{
    data(){
        return {
            searchForm:{
                id: '',
                name: '',
                status: '',
                category: ''
            }
        }
    },
    methods: {
        search(){
           this.$emit('search',this.searchForm)
        }
    },
}
</script>
<style lang="sass">
.el-form
    width: 300px

</style>
