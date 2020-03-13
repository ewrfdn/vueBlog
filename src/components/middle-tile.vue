<template >
  <div class="tileRoot">
    <fv-button
      borderRadius="1"
      @click="gotoPage()"
      class="middle-tile"
      theme="dark"
      :background="color"
    >
      <div :class="{hidden:hiddenPic,display:displayPic}">
        <img src="../pic/pre.jpg" class="pic-content" />
      </div>
      <p :class="{hiddenTxt:!hiddenPic,displayTxt:!displayPic}">
        <span class="articleTitle"  v-cloak>{{articleTitle}}</span>
        <br>
        <span v-text="profile"></span>
      </p>
      <p class="tile-title" v-text="title">IT之家</p>
    </fv-button>
  </div>
</template>

<script>
export default {
  mounted(){
  setTimeout(a=>{
      this.swichBg()
    },this.time*1000)
  },
  props:{color:{
    default:"#c22"

  },url:{
    default:""
  },
  time:{
    // type:"number",
    default:5,

  },picUrl:{
    // type:"string",
    default:""
  },profile:{
    // type:"string",
    default:"IT之家3月12日消息 据IT之家网友反馈，Steam商店现在已经开启了支付宝“花呗”的支持，玩家可以使用“花呗”在Steam上购买游戏了"

  },articleTitle:{
    default:"这是文章标题"
  },
  title:{
    default:"IT之家"
  }},
  data(){
    return{
      hiddenPic:true,
      displayPic:false,
      inveral:8000,
    }
  },
  methods:{
    swichBg:function(){
      this.hiddenPic=!this.hiddenPic;
      this.displayPic=!this.displayPic;
      window.setTimeout(()=>{
      this.swichBg()
      },this.inveral)

    },
    gotoPage:function(){
      window.location.href=this.url
    }
  }

}
</script>

<style lang="less">
.tileRoot {
  overflow: hidden;
  width: 305px;
  height: 155px;
}
.middle-tile:hover {
  box-shadow: #0083ee 1px 1px 8px 2px;
}
.middle-tile {
  position: relative;
  top: 1px;
  left: 1px;

  .reveal-border {
    position: absolute !important;
    // z-index: 1000;
  }
  //.button-container{
  //   position: absolute !important;
  //   z-index: 1010;
  //   position: absolute;

  // }
  .hidden {
    position: absolute;
    top: -200px;
    left: 0;
    width: 100%;
    height: 100%;
    transition: 1s;
    transition: 1s;
    .pic-content {
      position: relative;
      top: 0;
      width: 100%;
      height: 100%;
      margin-top: 2px;
      left: 0px;
      object-fit: cover;
    }
  }
  .display {
    position: absolute;
    width: 100%;
    height: 100%;
    top: -2px;
    left: 2px;
    transition: 1s;
    .pic-content {
      object-fit: cover;
      position: absolute;
      width: 100%;
      height: 100%;
      margin-top: 0px;
      left: 0px;
    }
  }
  .hiddenTxt {
    position: absolute;
    top: 200px;
    transition: 1s;
    text-align: left;
  }
  .displayTxt {
    position: absolute;
    top: 15px;
    text-align: left;
    left: 20px;
    transition: 1s;
  }
  .articleTitle{
    font-size: 1.2em;
    font-weight: 800;
  }
  width: 300px;
  height: 150px;
  .tile-title {
    position: absolute;
    left: 20px;
    bottom: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #fff;
  }
}
</style>
