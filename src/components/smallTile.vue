<template>
  <fv-button class="smallTile" @click="gotoPage()" :background="color" theme="dark"  >
      <img class="tileIcon" src="../pic/edit.svg">

<p class="smallTileName" v-text="title"> </p>
  </fv-button>
</template>

<script>
export default {
  props:{
      color:{
    default:"#016fb9"
  },url:{
    default:""
  },time:{
    // type:"number",
    default:5,
  },picUrl:{
    // type:"string",
    default:""
  },title:{
    default:"app1"
  }},
  data(){
    return{
      
    }
  },
  methods:{
    
    gotoPage:function(){
      window.location.href=this.url
    }
  
}}
</script>

<style lang="less">
    .smallTile{
        width: 150px;
        height: 150px;
        position: relative;
        .tileIcon{
            position: absolute;
            width: 60px;
            height: 60px;
            top: 45px;
            left: 45px;
        }
        .smallTileName{
            position: absolute;
            left: 20px;
            bottom: 15px;
            font-size: 1.2em;
            font-weight: 500;
        }
    }
</style>>
