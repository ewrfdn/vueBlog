<template>
  <div class="main" :class="{darkFontG0:darkmode,garkBgG0:darkmode}">
    <nav-bar-vue :darkmode="darkmode" :clickButton="open" ></nav-bar-vue>
    <div class="body-div">
      <div class="left-part" >
        <div class="top-div" :class="{darkFontG0:darkmode,darkBgG0:darkmode,darkShadow:darkmode}">
          <img src="../pic/timg.jpg">
        </div>
        <div class="article-list" :class="{darkShadow:darkmode}">
          <div class="head" :class="{darkFontG0:darkmode,darkBgG0:darkmode}">
          <div>
             <router-link  :to='{name:"home",params:{url:"/api/article?t=list&sort=desc"}}' :class="{darkFontG0:darkmode,linkActive:active==1}">最新</router-link>
            </div>
            <div>
              <router-link   :to='{name:"hot",params:{url:"/api/article?t=list&sort=pop"}}' :class="{darkFontG0:darkmode,linkActive:active==2}" >热门</router-link>
              </div>
          </div>
          <div class="list">
          <router-view class="router" :darkmode="darkmode"></router-view>
          </div>
        </div>
      </div>
      <div class="right-part">
         <panel-card-vue :darkmode="darkmode" class="frist"></panel-card-vue>
    <info-card-vue :darkmode="darkmode" class="info-card"
    :articleNumber="theme.length"
    :viewNumber="views"
    :runTime="runTime"
    ></info-card-vue>
    <tool-panel-vue :darkmode="darkmode"></tool-panel-vue>
      </div>
    </div>
    <goto-top-vue :darkmode="darkmode" ></goto-top-vue>
    <setting-vue :darkmode="darkmode" v-model="closeSetting"></setting-vue>
  </div>
</template>

<script>
import{ getStatistic  } from '../api/api'
import navBarVue from "../components/navBar1.vue";
import gotoTopVue from '../components/gotoTop.vue';
import settingVue from '../components/setting.vue';
import articleCardVue from '../components/articleCard.vue';
import toolListVue from '../components/toolList.vue';
import axios from '../../node_modules/axios';
import infoCardVue from "../components/infoCard.vue";
import panelCardVue from '../components/panelCard.vue';
import toolPanelVue from '../components/toolPanel.vue';
export default {
  created(){
    this.getdate();
    if(this.darkmode){
        document.body.style.background="#242424"
      }else{
        document.body.style.background="#f6f6f6"
      }
    this.getLocalStorage()
  },
  beforeDestroy(){
        document.body.style.background="#fff"

  },
  components: {
    navBarVue,
    gotoTopVue,
    settingVue,
    toolListVue,
    panelCardVue,
    infoCardVue,
    toolPanelVue,

  },
  data() {
    return {
      theme:[],
      darkmode: false,
      views:0,
      active:true,
      darkmode: false,
      closeSetting: true,
      defaultContext:false,
      followSystem:true,
      panelCardVue,
    infoCardVue,
    toolPanelVue,
    runTime:45
    };
  },
  methods: {
    getLocalStorage: function() {
      var storage = window.localStorage;
      if (storage.autoTheme == "false" && storage.followSystem == "false") {
        if (storage.theme === "dark") {
          this.darkmode = true;
        } else {
          this.darkmode = false;
        }
      } else if (storage.followSystem == "true" || this.followSystem) {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          this.darkmode = true;
        } else {
          this.darkmode = false;
        }
      } else {
      }
      this.defaultContext = storage.defaultContext == "true" ? true : false;
    },
    open:function(){
    },
    getdate:function(){
      getStatistic({t:"theme"}).then((res)=>{
        this.theme=eval(res)
      }),
      getStatistic({t:"views"}).then((res)=>{
        var l=eval(res)
        for(var i=0;i<l.length;i++){
          this.views+=l[i][1]
        }
        // alert(this.views)
      })
    }
   

  },
  watch:{
    darkmode:function(val) {
      if(val){
        document.body.style.background="#242424"
        
      }else{
        document.body.style.background="#f6f6f6"
      }
    },
    $route(to,from){
      if(to.path=="/home"){
        this.active=1
      }if(to.path=="/hot"){
        this.active=2
      }
    }
  }

};
</script>

<style lang="less" scoped>
 .main::after{
      content: "";
      display: block;
      clear: both;
    }
.main{
  width: 100%;
  height:100%;
  .body-div::after{
      content: "";
      display: block;
      clear: both;
    }
  .body-div{
    width: 1025px;
    margin: 50px auto;
    padding: 10px;
   
    .left-part,.right-part{
      float: left;
    }
    .left-part{
      width: 650px;
      .top-div{
        width: 100%;
        height: 120px;
        background: #fff;
        box-shadow: #ddd 0px 0px 10px 1px ;   
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }     
      }
      .article-list{
        width: 100%;
      margin-top:10px;
        box-shadow: #ddd 0px 0px 10px 1px ;        
        .head{
          width: 100%;
          height: 60px;
          border-bottom: solid 1px #eee;
          background: #fff;
          border-radius: 2px;
          font-weight:bold;
          .more{
            display: none;
          }
          div{
            float: left;
            width: 80px;
            height:100%;
            line-height: 60px;
            text-align: center;
            a{
              text-decoration: none;
            color: #000;
            }
            .linkActive{
              color:#34ace0 !important;
            }
            
          }
        }

      }
    }
    .right-part{
      width: 300px;
      padding-left: 10px;
      .info-card{
        margin-top: 10px;
      }

    }
  }
}
 
</style>
<style  >
body{
  width: 100%;
  height: 100%;
}
</style>