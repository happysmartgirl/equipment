<template>
    <div class="login-wrapper">
        <transition name="login">
            <div class="login" v-if="isShow">
                <div class="left">
                    <h1>欢迎使用<br/>北工商设备管理系统</h1>
                </div>
                <div class="right">
                    <ul class="tab">
                        <li @click="type='sms'" :class="type=='sms'?'active':''">短信登陸</li>
                        <li @click="type='password'" :class="type=='password'?'active':''">密碼登錄</li>
                    </ul>
                    <div class="form">
                        <div class="sms-form" v-show="type=='sms'">
                            <div class="input">
                                <p  v-color v-html="checkPhone"></p>
                                <el-input v-model="phone" placeholder="手機號"></el-input>
                            </div>
                            <div class="input">
                                <el-input v-model="code" placeholder="验证码"  @keyup.native.enter="login"></el-input>
                                <p v-html="checkCode"  v-color></p>
                                <button class="send" :disabled="!phone ||　time!=6" @click="sendCode">{{sendBtnLabel}}</button>
                            </div>
                        </div>
                        <div class="password-form" v-show="type=='password'">
                            <div class="input">
                                <p v-html="checkUsername" v-color></p>
                            <el-input v-model="username" placeholder="用户名"></el-input>
                            </div>
                            <div class="input">
                                <p v-html="checkPassword" v-color></p>
                                <el-input v-model="password" placeholder="密码" type="password"  @keyup.native.enter="login"></el-input>
                            </div>
                        </div>
                        <el-button type="primary" class="login-btn" @click.native="login">登录</el-button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    import axios from 'axios'
    export default{
        data(){
            return {
                isShow:false,
                type:'sms',//password
                phone:"13800138001",
                code:"654321",
                username:"",
                password:'',
                time:6,
                sendBtnLabel:'发送验证码',
                timer:null,
                checkPhone:'',
                checkCode:"",
                checkUsername:'',
                checkPassword:''
            }
        },
        directives:{
            color:{
                inserted(el){
                    el.style.color = '#f00'
                }
            }
        },
        mounted(){
            setTimeout(()=>{
                this.isShow = true
            },500)
        },
        methods: {
            login(){
                const {type,phone,code,username,password} = this
                let params = {
                    type
                }
                if(type=='sms'){
                    params.phone = phone
                    params.code = code
                }else{
                    params.username = username
                    params.password = password
                }
                axios.post('/equipment/login',params).then(({data})=>{
                    if(!data.code){
                        this.$router.push('/about/overview')
                    }else{
                        this.$message({
                            message: '警告哦，这是一条警告消息',
                            type: 'warning'
                        });
                    }
                })
                //- if(this.type=='sms'){
                //-     this.checkUsername = ''
                //-     this.checkPassword = ''
                //-     if(!this.code){
                //-         this.checkCode = '验证码不正确'
                //-     } 
                //-     if(!this.phone){
                //-         this.checkPhone = '手机号不正确'
                //-     }　
                //-     axios.post('/equipment/login',{
                //-         type:'sms',
                //-         phone:"13800138002",
                //-         code:"654321"
                //-     })
                //- }else if(this.type=='password'){
                //-     this.checkCode = ''
                //-     this.checkPhone = ''
                //-     if(!this.username){
                //-         this.checkUsername = '用户名不正确'
                //-     } 
                //-      if(!this.password){
                //-         this.checkPassword = '密码不正确'
                //-     }
                //-     axios.post('/equipment/login',{
                //-         type:'password',
                //-         username:"lidazhao",
                //-         password:"Qwe123"
                //-     })
                //- }
            },
            getCode(){
                axios.post('/equipment/code',{
                    phone: this.phone
                }).then(({data})=>{
                    if(!data.code){
                        this.$message({
                            message: '发送成功请查收',
                            type: 'success'
                        });
                    }
                })
            },
            test(){
                console.log(1)
            },
            sendCode(){
                const {phone} = this
                if(!phone) return
                if(!/^1\d{10}$/.test(phone)) {
                    this.checkPhone = '手机号填写错误'
                    return
                }
                //通过手机号码检验后调用接口，并开始倒计时
                this.getCode()
                this.checkPhone = ''
                this.time--
                this.sendBtnLabel = `${this.time}秒后重发`
                this.timer = setInterval(()=>{
                    this.time--
                    this.sendBtnLabel = `${this.time}秒后重发`
                    if(this.time<=0){
                        this.sendBtnLabel = '发送验证码'
                        clearInterval(this.timer)
                        this.time = 6
                    }
                },1000)

            }
        },
    }

</script>
<style scoped lang="sass">


.login-wrapper
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: url('~@/assets/img/login-bg.png') no-repeat center
    background-size: cover
    
    .login 
        position: fixed
        width: 900px
        height: 500px
        left: 50%
        top: 50%
        transform: translate(-50%,-50%)
        background: #fff
        border-radius: 10px
        overflow: hidden
        display: flex
        .left
            width: 560px
            background: url('~@/assets/img/login-left.png') no-repeat center
            background-size: cover
            h1
                font-size: 32px
                color: #fff
                margin: 398px 0 70px 70px
        .right
            flex: 1;
            padding: 90px 50px 0 50px
            .tab
                display: flex
                justify-content: space-around
                color: #666
                li.active
                    position: relative
                    color: #1989FA
                    &:after
                        content: ''
                        position: absolute
                        width: 26px
                        height: 2px
                        background:#1989FA
                        bottom: -10px
                        left: 50%
                        margin-left: -13px
                li:hover
                    cursor: pointer
            .sms-form
                .input
                    margin-top: 36px
                    width: 240px
                    input
                        width: 240px
                        border: 1px solid #ccc
                        line-height: 40px
                        padding-left: 13px
                        box-sizing: border-box
                    &:last-child
                        width: 240px
                        display: flex
                        position: relative
                        p
                            position: absolute
                            top: -30px
                            color: #f00
                        .send
                            display: inline-block
                            width: 100px
                            height: 40px
                            background: rgb(245,246,250)
                            font-size: 12px
                            text-align: center
                            line-height: 40px
            .password-form
                .input
                    margin-top: 36px
                    width: 240px
                    input
                        width: 240px
                        border: 1px solid #ccc
                        line-height: 40px
                        padding-left: 13px
            .login-btn
                width: 240px
                line-height: 40px
                color: #fff
                background: rgb(80,136,246)
                border-radius: 8px
                margin-top: 17px
    .login-enter,.login-leave-to
        transform: translateY(10%) scale(.8)
        opacity: 0
    .login-enter-active,.login-leave-active
        transition: all 1.5s



</style>