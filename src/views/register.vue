<template>
<div class="register-wrapper">
    <div class="l">
        <h1 class="title">设备检索</h1>
        <search-form @search="onSearch"></search-form>
    </div>
    <div class="r">
        <div class="t">
             <i class="el-icon-edit"></i>
            <el-button type="text" @click="onAdd">登记新设备</el-button>
            <div class="color-list">
                <div class="color-item" v-for="item in $store.state.preStatusList" :key="item.id">
                    {{item.name}}
                    <div class="color-box" :style="{'background':item.color}"></div>
                </div>
            </div>
        </div>
        <div class="c">
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="id" label="设备编号"></el-table-column>
                <el-table-column prop="name" label="设备名称" ></el-table-column>
                <el-table-column prop="status" label="设备状态">
                     <template slot-scope="scope">
                       {{ getStatusInfo(scope.row.status).name }}
                       <div class="color-box" :style="{'background':getStatusInfo(scope.row.status).color}"></div>
                     </template>
                </el-table-column>
                <el-table-column prop="category" label="设备分类" >
                   <template slot-scope="scope">
                        {{($store.getters.categoryObj[scope.row.category]||{}).name}}
                   </template>
                </el-table-column>
                <el-table-column prop="number" label="设备数量" ></el-table-column>
                <el-table-column prop="price" label="设备单价"></el-table-column>
                <el-table-column prop="time" label="购置时间"></el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button @click="viewDetail(scope.row.id)">详情</el-button>
                        <template v-if="scope.row.status==='STATUS1'">
                            <el-button type="primary" @click="viewEdit(scope.row.id)">编辑</el-button>
                            <el-button type="primary" @click="viewCheck(scope.row.id)">审核</el-button>
                        </template>
                        <el-button @click="viewDetail(scope.row.id)" v-else>入库</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination @size-change="onPageSizeChange" @current-change="onPageNoChange" :current-page="pageNo" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total" ></el-pagination>
        </div>
        <div class="b"></div>
    </div>

</div>


</template>
<script>
import axios from 'axios'
import SearchForm from '@/components/SearchForm.vue'
export default{
    components:{
        'search-form':SearchForm
    },
    data(){
        return{
            total: 0,
            list: [],
            pageNo: 1,
            pageSize: 10,
            searchData: {},
            loading: true
        }
    },
    created(){
        this.getList();

    },
    methods:{
      viewCheck(id){
           this.$confirm('确认通过审核吗?', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.loading = true
                  axios.post('/equipment/pre-check',{id}).then(()=>{
                    this.$message.success('审核成功')
                    this.getList()

                  }).finally(()=>{
                    this.loading = false
                  })
                }).catch(() => {});
      },
        getStatusInfo(id){
            return this.$store.getters.preStatusObj[id];
        },
        viewDetail(id){
            this.$router.push('/about/registerdetail/'+id)
        },
        viewEdit(id){
            this.$router.push('/about/registeredit/'+id)
        },
        onAdd(){
            this.$router.push('/about/registeradd')
        },
        onSearch(searchData){
            this.pageNo = 1;
            this.searchData = searchData;
            this.getList();
        },
        getList(){
            this.loading = true;
            axios.post('/equipment/pre-list',{
                pageNo: this.pageNo,
                pageSize: this.pageSize,
                ...this.searchData
            }).then(({data})=>{
                this.list = data.data.list;
                this.total = data.data.total;
                this.loading = false;
            })
        },
        onPageSizeChange(pageSize){
            this.pageSize = pageSize;
            this.getList()
        },
        onPageNoChange(pageNo){
            this.pageNo = pageNo;
            this.getList()
        }
    },

}
</script>
<style lang="sass">
.register-wrapper
    display: flex
    .l
        flex: 0 0 300px
    .r
        flex: 1 1 auto
        margin: 0 20px
        .color-item
            display: inline-block
            .color-box
                width: 8px
                height: 8px
                display: inline-block
        .color-box
                width: 8px
                height: 8px
                display: inline-block
</style>
