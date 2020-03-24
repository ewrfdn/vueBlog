<template>
  <div class="main" :class="{darkFontG0:darkmode,garkBgG0:darkmode}">
    <nav-bar-vue :darkmode="darkmode" ></nav-bar-vue>
    <div class="body-div"></div>
    <goto-top-vue :darkmode="darkmode"></goto-top-vue>
    <setting-vue :darkmode="darkmode" v-model="closeSetting"></setting-vue>
  </div>
</template>

<script>
import navBarVue from "../components/navBar.vue";
import gotoTopVue from '../components/gotoTop.vue';
import settingVue from '../components/setting.vue';
export default {
  created(){
    this.getLocalStorage()
  },
  components: {
    navBarVue,
    gotoTopVue,
    settingVue,
  },
  data() {
    return {
      darkmode: false,
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
    }
  },
  watch:{
    darkmode:function(val) {
      if(val){
        document.body.style.background="#101010"
      }else{
        document.body.style.background="#fff"
      }
    },
  }

};
</script>

<style lang="less" scoped>
</style>