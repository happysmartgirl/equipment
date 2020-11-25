<template>
<div class="register-add-wrapper">
    <h3 class="title">设备编号 {{id}}</h3>
    <el-form label-position="right" :model="formData" ref="ruleForm" :rules="rules" label-width='100px'>
        <el-form-item label="设备名称" prop="name">
            <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="设备分类" prop="category">
            <el-select v-model="formData.category">
                <el-option
                    v-for="item in categoryList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="设备数量" prop="number">
            <el-input v-model="formData.number"></el-input>
        </el-form-item>
        <el-form-item label="设备单价" prop="price">
            <el-input v-model="formData.price"></el-input>
        </el-form-item>
    <el-date-picker v-model="formData.time" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd">
        </el-date-picker>
    </el-form>
    <el-button @click="save" :loading="loading">保存</el-button>
    <el-button @click="$router.back()">返回列表</el-button>
</div>

</template>
<script>
import axios from 'axios'
import RegisterMixin from '@/mixins/register.js'
export default{
    mixins: [RegisterMixin],
    data(){
        var checkNumber = (rule, value, callback) => {
            if (!(parseInt(value)==value && value>=1)) {
            callback(new Error('数量必须大于等于1的整数'));
            } else {
            callback();
            }
        };
        var checkPrice = (rule, value, callback) => {
            if (value<=0) {
                callback(new Error('价格必须大于0'));
            } else {
                callback();
            }
        };
        return {
            loading: false,
            id:this.$route.params.id,
            formData:{
                name:'',
                status:'未审核',
                category:'',
                number:'',
                price:'',
                time:""
            },
            detail:{},
            rules:{
                name: [
                    { required: true, message: '请输入设备名称', trigger: 'blur' },
                ],
                number: [
                    { required: true, message: '请输入设备数量', trigger: 'blur' },
                    {validator: checkNumber}
                ],
                price: [
                    { required: true, message: '请输入设备单价', trigger: 'blur' },
                    {validator: checkPrice}
                ],
                time: [
                    { required: true, message: '请输入购置日期', trigger: 'blur' },
                ],
                category: [
                    { required: true, message: '请输入设备分类', trigger: 'change' },
                ],
            },
            categoryList:[],
            isDataChange:false,
            isInit:true
        }
    },
    methods: {
        setData(val){
            this.formData = {
                name:val.name,
                category:val.category,
                number:val.number,
                price:val.price,
                time:val.time
            }
        },
        save(){
             this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                     axios.post('/equipment/pre-edit',{
                         ...this.formData,
                         id: this.id
                     }).then(()=>{
                         this.$message.success('编辑成功');
                         this.$router.go(-1)
                     })
                } else {
                    this.$message.warning('表单未完成')
                }
            });
        },
        getCategory(){
            axios.post('/equipment/category-list').then(({data})=>{
                console.log(data)
                this.categoryList = data.data
            })
        },

    },
    watch:{
      formData:{
        deep: true,
        handler(){
          if(this.isInit){
            this.isInit = false
          }else{
            this.isDataChange = true
          }
        }
      }
    },
    beforeRouteLeave(to,from,next){
       if(this.isDataChange){
         setTimeout(()=>{
           this.$confirm('您的表单已保存,确定要退出吗','重要提示',{
             confirmButtonText:'确定退出',
             cancelButtonText:'留在本页',
             type:'warning'
           }).then(()=>{
             next()
           }).catch(()=>{
             next(false)
           })
         },200)
       }else{
         next()
       }
    }
}
</script>
<style lang="sass">
.el-form
    width: 500px
</style>
