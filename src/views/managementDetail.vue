<template>
<div class="register-detail">
    <h2>设备详情</h2>
    <h4>设备编号 {{detail.id}}</h4>
    <h4>设备状态 {{detail.status}}</h4>
    <h4>设备名称 {{detail.name}}</h4>
    <h4>设备分类 {{detail.category}}</h4>
    <h4>设备价格 {{detail.price}}</h4>
    <h4>设备数量 {{detail.number}}</h4>
</div>
</template>
<script>
import RegisterMixin from '@/mixins/register.js'
import axios from 'axios'
export default{
    mixins: [RegisterMixin],
    data(){
        return {
            // id:this.$route.params.id,
            detail:{}
        }
    },
    methods: {
        setData(val){
            this.detail = val
        }
    },
    created(){
        // console.log(this.detail)
        axios.get('/equipment/equip-detail?id='+this.id).then((data)=>{
          this.detail = data.data.data
        })
    }
}
</script>
<style></style>
