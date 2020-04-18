<template>
  <div class="container" :class="{darkFontG1:darkmode,darkBgG0:darkmode,darkShadow:darkmode}">
    <div class='row'>
        <router-link to="/editor">
            <div class="grid" :class="{darkFontG1:darkmode}">
            <p><span><i class="el-icon-edit"></i></span>
            <br>
            <span>写文章</span>
            </p>
        </div>
        </router-link>
       
         <router-link to="/user">
            <div class="grid" :class="{darkFontG1:darkmode}">
            <p><span><i class="el-icon-user"></i></span>
            <br>
            <span>关于我</span>
            </p>
        </div>
        </router-link> <router-link to="/login">
            <div class="grid" :class="{darkFontG1:darkmode}">
            <p><span><i class="el-icon-set-up"></i></span>
            <br>
            <span>登录</span>
            </p>
        </div>
        </router-link>

    </div>
    <div class="row">
         <router-link to="/editor" >
            <div class="grid" :class="{darkFontG1:darkmode}">
            <p><span><i class="el-icon-folder-opened"></i></span>
            <br>
            <span>归档</span>
            </p>
        </div>
        </router-link>
       
         <router-link to="/editor">
            <div class="grid" :class="{darkFontG1:darkmode}">
            <p><span><i class="el-icon-setting"></i></span>
            <br>
            <span>后台管理</span>
            </p>
        </div>
        </router-link> <router-link to="/editor">
            <div class="grid" :class="{darkFontG1:darkmode}">
            <p><span><i class="el-icon-cpu"></i></span>
            <br>
            <span>仪表盘</span>
            </p>
        </div>
        </router-link>
    </div>      
  </div>
</template>

<script>
export default {
    props:{
        darkmode:{
            default:false,
        }
    }
    
}
</script>

<style lang="less" scoped>
.container{
    width: 300px;
    height: 200px;
    background: #fff;
    border-radius: 3px;
    box-shadow: #ddd 0px 0px 10px 1px ;  
    // border-right: solid 1px #eee;
    // border-bottom: solid 1px #eee;
    .row{
        width: 100%;
        height: 50%;
         .grid{    
             color:#162836;
             width: 33%;
             float:left;
             text-align:center;
             padding-top: 25px;
             i{
                 font-size:1.5em;
             }
             p{
                 font-size:1em;
                 line-height: 25px;
                 
             }
    }}
   
}
</style>
