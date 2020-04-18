<template>
 <el-tooltip 
  class="item" :effect="theme" content="回到顶部" placement="top-start">
       <div @click="gotoTop()" class="goto-top"  :class="{darkFont0:darkmode,darkBg:darkmode,displayButton:isDisplay}">
    <i class="el-icon-caret-top"></i>
  </div>
    </el-tooltip>

</template>

<script>
export default {
   mounted() {
    var t=window.innerHeight
    window.addEventListener("scroll", ()=>{
        if(document.documentElement.scrollTop>t/2){
            this.isDisplay=true;

        }else{
            this.isDisplay=false;

        }
    });
  },
  props: {
    darkmode: {
      default: false,
    }
  },
   data(){
       return {
           isDisplay:false,
            theme:"light"

       }
    },
   
  methods: {
   
    gotoTop: function() {
        var t,temp=~~(document.documentElement.scrollTop),step=0;
        var half=~~(temp/2)
        t=setInterval(() => {
          temp-=step
        if(temp>0){
        document.body.scrollTop =document.documentElement.scrollTop =temp;
        }else{
            clearInterval(t)
            document.body.scrollTop=document.documentElement.scrollTop=0
        }
        if(temp<half){
            
            if(step<=3){
                step=2
            }else{
                step-=3
            }
        }else{
        step+=3;
        }
        }, 16);

    }
  },
  watch:{
      darkmode:function(val){
          if(val){
              this.theme="dark"
          }else{
              this.theme="light"
          }
      }
  }
  

};
</script>

<style lang="less" scoped>
.darkFont0 {
  color: #ccc !important;
}

.darkBg {
  background: #000 !important;
box-shadow: #111 0px 0px 3px 1px !important;

}
.goto-top {
  width: 40px;
  height: 40px;
  font-size: 1.5em;
  position: fixed;
  bottom: 50px;
  right: 50px;
  color: #606060;
  background: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 5px;
  display: none;
  box-shadow: #ddd 0px 0px 5px 1px;
}
@media screen and (max-width: 550px) {
.goto-top{
  bottom: 20px;
  right: 20px;
}
}
.goto-top:hover {
  width: 42px;
  height: 42px;
  bottom: 49px;
  right: 49px;
}
.displayButton{
    display: block !important;
}
</style>