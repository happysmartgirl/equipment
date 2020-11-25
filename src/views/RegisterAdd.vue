<template>
<div class="register-add-wrapper">
    <h1 class="title">登记添加</h1>
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
    <el-button @click="save">保存</el-button>
    <el-button @click="$router.back()">返回列表</el-button>
</div>

</template>
<script>
import axios from 'axios'
export default{
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
            formData:{
                name:'',
                status:'未审核',
                category:'',
                number:'',
                price:'',
                time:""
            },
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
            categoryList:[]
        }
    },
    methods: {
        save(){
             this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                     axios.post('/equipment/pre-add',this.formData)
                     this.$message('添加成功')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getCategory(){
            axios.post('/equipment/category-list').then(({data})=>{
                console.log(data)
                this.categoryList = data.data
            })
        }
    },
    created(){
        axios.post('/equipment/pre-list',{
            pageNo:1,
            pageSize:20
        }).then((data)=>{
            console.log(data)
        })
        this.getCategory()
    }
}
</script>
<style lang="sass">
.el-form
    width: 500px
</style>