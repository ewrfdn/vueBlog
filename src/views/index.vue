<template>
  <div class="main" :class="{darkFontG0:darkmode,garkBgG0:darkmode}">
    <nav-bar-vue :darkmode="darkmode" ></nav-bar-vue>
    <div class="body-div">
      <div class="left-part">
        <div class="top-div">
        </div>
        <div class="article-list">
          <div class="head" :class="{darkFontG0:darkmode,darkBgG0:darkmode}">
          <div>
             <router-link to='home' :class="{darkFontG0:darkmode,linkActive:active}">最新</router-link>

            </div>
            <div>
              <router-link to="hot" :class="{darkFontG0:darkmode,linkActive:!active}" >热门</router-link>
              </div>
          </div>
          <div class="list">
          <router-view class="router" :darkmode="darkmode"></router-view>
          </div>
        </div>
      </div>
      <div class="right-part"></div>
    </div>
    <goto-top-vue :darkmode="darkmode" ></goto-top-vue>
    <setting-vue :darkmode="darkmode" v-model="closeSetting"></setting-vue>
  </div>
</template>

<script>
import navBarVue from "../components/navBar.vue";
import gotoTopVue from '../components/gotoTop.vue';
import settingVue from '../components/setting.vue';
import articleCardVue from '../components/articleCard.vue';
export default {
  created(){
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
    articleCardVue,
  },
  data() {
    return {
      darkmode: false,
      active:true,
      darkmode: false,
      closeSetting: true,
      defaultContext:false,
      followSystem:true,
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
      if(to.path=="/hot");{
        this.active=!this.active
      }
    }
  }

};
</script>

<style lang="less" scoped>

.main{
  width: 100%;
  height:100%;
  .body-div{
    max-width: 1025px;
    margin: 50px auto;
    padding: 25px;
    .body-div::after{
      content: "";
      display: block;
      clear: both;
    }
    .left-part,.right-part{
      float: left;
    }
    .left-part{
      width: 650px;
      .top-div{
        width: 100%;
        height: 120px;
        
      }
      .article-list{
        width: 100%;
        .head{
          width: 100%;
          height: 60px;
          border-bottom: solid 1px #eee;
          background: #fff;
          border-radius: 2px;
          font-weight:bold;
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