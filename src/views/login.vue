
<template>
<div  class="contain" id=contain>
<div class="form-div" v-bind:class="{login_form:noDisplayed}">
  <el-form ref="form" :model="form" class="main-form"  >
        <h2 class="form-tit">登录</h2>
        <el-form-item label="" class="form-item"  id="first-item">
            <el-input v-model="form.username" placeholder="用户名" prefix-icon="el-icon-user" class="input-box"></el-input>
        </el-form-item>
        <el-form-item label="" class="form-item">
            <el-input v-model="form.password" prefix-icon="el-icon-key" placeholder="请输入密码" show-password class="input-box"></el-input>
        </el-form-item>
         <el-form-item label="" class="form-item">
            <el-input v-model="form.proveCode" placeholder="验证码" class="prove-code" ></el-input>
        </el-form-item>
        <el-form-item class="form-item " >
            <el-button type="primary" id="login-submit-button" v-on:click="submit_login">登录</el-button>
        </el-form-item>
        
        <el-breadcrumb separator="|" class="bottom-item">
            <el-breadcrumb-item ><a href="#" v-on:click=switchForm>注册</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">关于本站</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">隐私</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="#"></a></el-breadcrumb-item>
        </el-breadcrumb>

    </el-form>
</div>
<div class="sign-form-div" v-bind:class="{signUp_form :displaySignUp}">
  <el-form ref="form" :model="form" class="main-form"  >
         <h2 class="form-tit">注册</h2>
        <el-form-item label="" class="form-item" >
            <el-input v-model="form1.username" placeholder="用户名" prefix-icon="el-icon-user" class="input-box"></el-input>
         </el-form-item>
         <el-form-item label="" class="form-item" >
             <el-input v-model="form1.mail" placeholder="邮箱" prefix-icon="el-icon-user" class="input-box"></el-input>
        </el-form-item>
        <el-form-item label="" class="form-item" >
            <el-input v-model="form1.password" placeholder="密码" prefix-icon="el-icon-user" class="input-box" show-password></el-input>
        </el-form-item>
        <el-form-item label="" class="form-item" >
            <el-input v-model="form1.provePassword" placeholder="确认密码" prefix-icon="el-icon-user" class="input-box" show-password></el-input>
        </el-form-item>
        <el-form-item label="" class="form-item">
            <el-input v-model="form1.proveCode" placeholder="验证码" class="prove-code" ></el-input>
             <el-button   class="send-button">  发送验证码</el-button>
         </el-form-item>
         <el-form-item>
             <el-button type="primary" id="submit-button">注册</el-button>
         </el-form-item>
         <el-breadcrumb separator="|" class="bottom-item">
            <el-breadcrumb-item><a href="#" v-on:click=switchForm>登录</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">关于本站</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="#">隐私</a></el-breadcrumb-item>
            <el-breadcrumb-item><a href="#"></a></el-breadcrumb-item>

        </el-breadcrumb>

    </el-form>

</div>
  
  
</div>
    
</template>
<script>
import {start} from'../scripts/background.js'
import { readSync } from 'fs';
import $ from"../../node_modules/jquery"
import axios from '../../node_modules/axios'

// import func from '../../vue-temp/vue-editor-bridge';

export default {
    name:"login",
    mounted(){
        start()

    },
    methods:{
   switchForm:function(){
    this.displaySignUp=!this.displaySignUp;
    this.noDisplayed=!this.noDisplayed;
//    }
    },
    submit_login:function(){
        axios.post("http://localhost:64688/api/login",{
            'username':this.form.username,
            'password':this.form.password,
            'proveCode':this.form.proveCode
        }).catch((response)=>{
            console.log(response)
        })
        
    },
    submit_signUp:function(){

    },
    getProveCode:function(){

    },
    sendProveCode:function(){

    }
    },

    data(){
        return  {
            form: {
                username:"",
                password:"",
                proveCode:"",
            },
            form1:{
            username:"",
            password:"",
            proveCode:"",
            mail:"",
            provePassword:""
            },
            noDisplayed:false,
            displaySignUp:false,
                  }
    }
    

}
</script>
<style lang="less" scoped>
.contain{
    width: 350px;
    height: 450px;
    margin-top: -200px;
    margin-left: -175px;
    position: absolute;
    left: 50%;
    top: 50%;
    box-shadow: 0px 0px 8px   #808080; 
    overflow: hidden;
    #first-item{
        margin-top: 80px;
    }
    .login_form{
       position: absolute;
       left:-350px;

    }
    .signUp_form{
        position: absolute; 
        left:0px !important;
        transition: 0.1s ease-out;
        }
    #login-submit-button{
        width: 80px;
        position:absolute;
        left: 50%;
        margin-top: 60px;
        margin-left: -40px;
    }
    .sign-form-div{
        position:absolute;
        left: 500px;
        top:0px;
        width: 350px;
        height: 450px;
       transition: 0.2s ease-in-out;

        
        .send-button{
            position: absolute;
            right: 0px;
        }
    }
    .form-div{
        width: 350px;
        height: 450px;
       transition: 0.2s ease-in-out;
     
    }
    .bottom-item{
        bottom: 10px;
        position: absolute;
        left: 87px;
   
    }
    
    .form-tit{
        text-align: center;
        color: #606060;
    }
    .main-form{
          width: 300px;
          margin: 0px auto;
          }
    .input-box{
    position:absolute;
    }
    .prove-code{
        width: 30%;
        position:absolute;
    }
    .form-item{
        height: 40px;
        margin-top: 10px;
    }

}
#submit-button{
   width: 80px;
   position:absolute;
   left: 50%;
   margin-left: -40px;

}
</style>