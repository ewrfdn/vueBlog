<template>
  <div class="contain" :class="{darkBg:darkmode}" @click="clickHandle()">
    <div class="cover">
      <img class="coverImg" src="../pic/timg.jpg" />
    </div>
    <div class="discrib" >
        <div class="title" :class="{darkFont0:darkmode}">
      <p v-text="title" ></p>
        </div>
      <p class="info" :class="{darkFont1:darkmode}" >
        <span>时间: &nbsp;</span>
        <span v-text="time"></span>
        
        <span class='theme'>主题: &nbsp;</span>
        <span v-text="theme"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    darkmode:{
        default:false
    },
    coverUrl: {
      default: "#/../pic/timg.jpg"
    },
    url:{
        default:'/t'
    },
    title: {
      default: "文章标题"
    },
    theme: {
      default: "文章"
    },
    time: {
      default: "1970-1-1"
    },
   
  },
  methods:{
      clickHandle:function(){
          window.location.href=this.url
      }
  }
  
};
</script>

<style lang="less" scoped>
.darkFont0{
    color:#fff !important;
}
.darkFont1{
    color:#aaa !important;

}
.darkBg{
    background: #242424 !important;
    box-shadow: #111 0px 5px 10px 1px !important;

}
.contain {
  width: 260px;
  height: 225px;
  box-shadow: #ddd 0px 5px 10px 1px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  .cover{
      width: 260px;
      height: 125px;
      .coverImg{
          object-fit: cover;
          width: 100%;
          height: 100%;
}}
.discrib{
    padding: 15px;
    .title{
        font-size: 1em;
        font-weight: 600;
        height: 40px;
        overflow: hidden;
        color:#404040;
    }
    .info{
        font-size: 0.8em;
        margin-top: 15px;
        .theme{
            margin-left: 15px;
        }
    }
}
  }
</style>