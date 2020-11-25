<template lang="pug">
.top-header
    h1 设备管理系统
    el-dropdown(class="user" @command="onClick")
        span(class="el-dropdown-link")
            | {{$store.state.username}}
            i(class="el-icon-arrow-down el-icon--right")
            el-dropdown-menu(slot="dropdown")
                el-dropdown-item(icon="el-icon-plus" command = 'changePassword'  @click="showPassword = true") 修改密码
                el-dropdown-item(icon="el-icon-plus" command="logout") 退出登录
    el-dialog(title="修改密码" :visible="showPassword" @close="showPassword=false")
        el-form
            el-form-item(label="旧密码")
                el-input(type="password")
            el-form-item(label="新密码")
                el-input(type="password")
        .dialog-footer(slot="footer")
            el-button(@click="showPassword = false") 取 消
            el-button(type="primary" @click="showPassword = false") 确 定


</template>
<script>
import axios from 'axios'
export default{
    data(){
        return{
            newVal:'',
            oldVal:'',
            showPassword: false
        }
    },
    methods: {
        logout(){
            //http://api.jxsjs.com/equipment/logout
            axios.post('/equipment/logout').then(()=>{
                if(data.code==0){　　　　　　　　　　　　　　　　　　　
                    this.$router.push('/login')
                }
            })
        },
        onClick(command) {

        },
        changePassword(){
            axios.post('/equipment/reset-password',{
               newVal: this.newVal,
               oldVal: this.oldVal
            }).then((data)=>{
                console.log(data)
            })
        }
    },
}
</script>
<style lang="sass" scoped>
.top-header
    height: 60px
    background: #0079C4
    padding: 0 20px
    color: #fff
    h1
        line-height: 60px
        font-size: 16px
        padding-left: 30px
        background: url(~@/assets/img/logo.png) no-repeat left center
        background-size: 20px
    .user
        position: absolute
        right: 20px
        top: 0
        line-height: 60px
</style>

