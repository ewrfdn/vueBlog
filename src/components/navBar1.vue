<template>
  <div id="nav" :class="{darkBg:darkmode}">
      <el-row :gutter="30">
  <el-col :span="12">
 <div class="part tit-div" ><p><span class="tit">张晖的博客</span ><span :class="{darkFont0:darkmode}" v-cloak>|{{title}}</span></p></div>
  </el-col>
  <el-col :span="12">
      <div class="nav-right">
          <el-dropdown popper-append-to-body="false">
  <span class="el-dropdown-link">
    <i class="el-icon-circle-plus-outline" :class={darkFont0:darkmode}></i>
  </span>
  <el-dropdown-menu slot="dropdown" :class="{dropDarkmode:darkmode}">
    <el-dropdown-item class="drop" icon="el-icon-set-up" :class="{itemDarkmode:darkmode}">个人管理页面</el-dropdown-item>
    <el-dropdown-item class="drop" icon="el-icon-s-order" :class="{itemDarkmode:darkmode}">查看文章</el-dropdown-item>
    <el-dropdown-item @click.native="openSetting()"  class="drop" icon="el-icon-s-tools" :class="{itemDarkmode:darkmode}">设置</el-dropdown-item>
    <el-dropdown-item  class="drop logout" icon="el-icon-switch-button" :class="{itemDarkmode:darkmode,displayLogout:isLogin}" @click.native="logout()">退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
      </div>
  </el-col>
</el-row>

  </div>
</template>

<script>
import {getCookie,setCookie,getStore,removeStore} from '../scripts/storage'
export default {
  created(){
    if(getCookie('islogin')=='true'){
      this.isLogin=true;
    }else{
      this.isLogin=false;
      let uid=getStore('uid')
      let token=getStore("token")
      console.log(uid)
    }
  },
  props:{
    darkmode:{
      default:false,
    },
  title:{
     default:"主页"
   }
  },
    data(){
      return{
        isLogin:false,
        activeIndex: '1',
        
      }
      
    },
    methods:{
      handleSelect:function () {
        
      },
      openSetting:function(){
        this.$parent.closeSetting=false;
      },
      logout:function(){
        var storage=window.localStorage;
        setCookie('islogin','false')
        this.isLogin=false;
        removeStore('uid');
        removeStore("token")
        this.$router.push("/home");
      }
    },
    components:{

    }

}
</script>


<style lang="less" scoped>
.darkFont0{
    color:#fff !important;
}

.darkBg{
    background: #000 !important;
    }
.button{
  position: absolute;
  left: 10px;
  top: 0;
}

#nav{
    width: 100%;
    height: 50px;
    background: #fff;
    position: fixed;
    top: 0;
    overflow: hidden;
    z-index: 10000;
    box-shadow:#888 0px 0px 3px ;
    .part{
        float: left;
        width: 80%;
        height: 50px;
        max-width: 300px;
        color: #999;
        .tit{
            color: #1080cc;
            font-size: 1.2em;
            font-weight: 400;
        }
        

    }
    .part>p{
        display: inline-block;
        line-height: 50px;
        width: 100%;
         text-align: right;


    }
    .nav-right{
        float:right;
        .el-icon-circle-plus-outline{
            font-size: 30px;
            line-height: 50px;
        
        }
        .el-dropdown{
             position: relative;
            right: 50px;
        }
      
       
    }
   .drop{
            font-size: 20px;
            line-height: 50px !important;
            background: chartreuse;
        }

   

}
.displayLogout{
  display: block !important;
}
.logout{
  display: none;
}
</style>
<style  >
.drop{
      font-size: 1em;
      line-height: 50px !important;
      width: 150px;
        }
.dropDarkmode{
  background: #000 !important;
  border-color: #000 !important;
 
}
 .itemDarkmode{
  color:#fff !important;
  }
  .itemDarkmode:hover{
    background: #404040 !important;
    color:#06f !important;

  }
</style>