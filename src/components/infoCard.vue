<template>
  <div class="container" :class="{darkFontG1:darkmode,darkBgG0:darkmode,darkShadow:darkmode}">
      <router-link to="/statistic">
    <div class='row1' :class="{darkFontG1:darkmode}">
    <p v-cloak> <i class="el-icon-edit-outline"> 数据统计 </i></p>
    <i class="el-icon-arrow-right"></i>
    </div>
    </router-link>
   
    <div class="row2">
    <hr>
        <div class="view-statistic">
            <p>访问量统计</p>
            <p class="number" v-cloak>{{viewNumber}}</p>
        </div> 
        <div class="article-statistic">
            <p>文章统计</p>
            <p class="number" v-cloak>{{articleNumber}}</p>
        </div>
    </div>
    <div class="row3">
    <hr>
    <p v-cloak>博客已经运行{{runTime}}天 <i class="el-icon-s-marketing"></i></p>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        darkmode:{
            default:false,
        },
        viewNumber:{
            default:0,
        },
        articleNumber:{
            default:0,
        },
        runTime:{
            default:0,
        }
    },
    data(){
        return{
          
            
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
    position: relative;
    color: #877f84;
    .row1{
        width: 100%;
        height: 50px;
        cursor: pointer;
       color: #877f84;

          p{
                line-height: 50px;
                text-align: left ;
                margin-left: 10%;
                font-size: 0.8em;
                i{
                    font-size: 1.5em;
                    position: relative;
                    top: 2px;
                }

            }
            i{
               position: absolute; 
               right: 15px;
               line-height: 50px;
               top: 0px;
               font-size: 1.5em;
            }
     
    }
    .row1:hover{
    color:#16d8ff !important;
    }
     .row2{
        width: 100%;
        hr{
            width: 80%;
            height: 1px;
            border: none;
            background-color: #eee;
        }
        padding-left:10%;
        // padding-top: 20px;
        div{
            float: left;
            width: 40%;
            margin-top: 15px;
            text-align: center;
            font-size: 0.8em;
            .number{
                font-size: 2em;
                color:#16d8ff
            }
        }
        .article-statistic{
            border-left: 1px solid #eee;
        }

        

    }
    .row3{
         hr{
            width: 80%;
            // color: #eee;
            height: 1px;
            border: none;
            background-color: #eee;
            margin:  0 auto;
            position: relative;
            top: 0px;
            
        }
        width: 100%;
        height: 40px;
        position: absolute;
        bottom: 0px;
        p{
                line-height: 39px;
                text-align: left ;
                margin-left: 10%;
                font-size: 0.8em;
                i{
                    font-size: 1.5em;
                    position: relative;
                    top: 2px;
                }

            }
    }


}
</style>
