<template>
  <div class="foot-contain">
    <div class="left-div">
      <a href=""><div class="icon share-sina "></div> </a>
      <a href=""><div class="icon share-qq "></div></a>
      <a href=""><div class="icon share-wechat"></div></a>
    </div>
    <div class="middle-div">
      <el-link href="http://beian.miit.gov.cn">©苏ICP备18000476号-2</el-link>
    </div>
    <div class="right-div"></div>
  </div>
</template>

<script>
export default {
data(){
    return {

    }
},
methods:{

}
}
</script>

<style lang="less">
.foot-contain{
    width: 100%;
    .left-div{
       .icon{
        width: 30px;
        height: 30px;
        border-radius: 100;
        // background: #00ff00;
        float: left;
        
      }
    };
    .middle-div{
     text-align: center;
    }
}
.foot-contain>div{
  float: left;
  min-width: 200px;
  height: 150px;
  width: 33%;
}
.foot-contain::after{
  content: '';
  display: block;
  clear: both;
}
</style>