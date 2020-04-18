<template>
  <div class="contain" :class="{darkFontG0:darkmode,darkBgG0:darkmode,show:display}"  ref="main">
    <div class="title-div" :class="{darkBgG1:darkmode}">
        <div ref="preview">
            <div class="inner" :class="{darkBg:darkmode}"></div>
        </div>
    </div>
    <div class="middle-div" >
      <div class="img-div"  :class="{darkBgG1:darkmode}">
      </div>
      <div class="preview-div" >
          <div :class="{darkBgG1:darkmode}" class="line"><div class="inner"  :class="{darkBg:darkmode}"></div></div>
          <div :class="{darkBgG1:darkmode}" class="line">
              <div class="inner" :class="{darkBg:darkmode}"></div>
          </div>
          <div :class="{darkBgG1:darkmode}" class="line">
              <div class="inner" :class="{darkBg:darkmode}" ></div>
          </div>
          <div :class="{darkBgG1:darkmode}" class="line">
              <div class="inner" :class="{darkBg:darkmode}"></div>
          </div>

      </div>
     
    </div>

    <div class="bottom-div" :class="{darkBgG1:darkmode}">
     <div ref="" class="inner" :class="{darkBg:darkmode}"></div>
    </div>
  </div>
</template>

<script>
import articleContextVue from "./articleContext.vue";
export default {
  mounted() {
      if(this.display){
          this.loop()
      }
   
  },
  props: {
      darkmode:{
          default:false,
      },
      display:{
          default:false,
      }
  },
  data() {
    return {
        t:null,
    };
  },
  methods: {
   loop:function(){
      var div=document.getElementsByClassName('inner'),a=[];
      this.t=setInterval(()=>{
          for(var i=0;i<div.length;i++){
              a[i]=(a[i]||0)+20;
              div[i].style.left=a[i]+'px';
              if(a[i]>650){
                  a[i]=0
              }
          }
      },16)
   }
  },
  watch:{
      display:function(val){
          if(val){
              this.loop();
          }else{
              clearInterval(this.t)
          }
      }
  },
  components: {
  }
  
};
</script>
    
<style lang="less" scoped>
.show{
    display: block !important;
}
.contain {
    display: none;
  max-width: 650px;
  width: 100%;
  background: #fff;
  position: relative;
  padding-top: 10px;
  padding-bottom: 40px;
  border-bottom: #eee 1px solid;
  .title-div {
    margin-left: 3%;
    width: 94%;
    height: 30px;
    background: #eee;
    overflow: hidden;
  }
  .middle-div {
    margin-left: 3%;
    margin-top: 10px;
    .img-div,
    .preview-div {
      overflow: hidden;
      float: left;
    }
  
    .img-div {
      width: 30%;
      height: 110px;
      background: #eee;   
      margin-top: 10px;


    }
    .preview-div {
      width: 65%;
      margin-left: 10px;
      .line{
          width: 100%;
          height: 20px;
          margin-top: 10px;
          background: #eee;   
          overflow: hidden;   
          padding: 0;
        
      }
    }   
  }
  .middle-div::after {
    content: "";
    display: block;
    clear: both;
  }
  .bottom-div {
    width: 94%;
    margin-left: 3%;
    max-width: 650px;
    background-color: #fff;
    height: 30px;
    background: #eee;      
    position: absolute;
    bottom: 0px;
    display: block;
    overflow: hidden;

  }
  .inner{
      width: 120px !important;
      height: 30px !important;
      position: relative;
      top: 0;
      background-image: linear-gradient(to left,rgba(240,240,240,0.5),rgba(255,255,255,0.5),rgba(240,240,240,0.5));
      margin: 0 !important;
  }
}
.darkBg{
      background-image: linear-gradient(to left,rgba(40,40,40,0.1),rgba(128,128,128,0.1),rgba(40,40,40,0.1)) !important;
}
</style>
<style >

</style>