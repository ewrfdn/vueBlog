<template>
  <div class="main" :class="{darkFontG0:darkmode,garkBgG0:darkmode}">
    <nav-bar-vue :darkmode="darkmode"  :isLogin="login"></nav-bar-vue>
    <div class="body-div">
      <div class="left-part">
        <manage-list-vue :darkmode='darkmode'></manage-list-vue>
      </div>
      <div class="right-part">
        <router-view></router-view>
      </div>
    </div>
    <goto-top-vue :darkmode="darkmode"></goto-top-vue>
    <setting-vue :darkmode="darkmode" v-model="closeSetting"></setting-vue>
  </div>
</template>

<script>
import navBarVue from "../components/navBar1.vue";
import gotoTopVue from '../components/gotoTop.vue';
import settingVue from '../components/setting.vue';
import manageListVue from "../components/manageList.vue"
import axios from "../../node_modules/axios"
export default {
  created(){
    this.getLocalStorage()
     axios({
          method: 'post',
          url: '/api/proveUser',
          data:{token:this.token},
          }).then((response)=> {
              if(response.data=='failed'){
                this.$router.push('/login')
              }else{
                var storage=window.localStorage;
                console.log(response)
                this.login=true;
                storage.token=response.data;
                this.token=response.data;
              }
             
         })
  },
  components: {
    navBarVue,
    gotoTopVue,
    settingVue,
    manageListVue,
  },
  data() {
    return {
      darkmode: false,
      darkmode: false,
      closeSetting: true,
      defaultContext:false,
      followSystem:true,
      token:"",
      login:false,
    };
  },
  methods: {
    getLocalStorage: function() {
      var storage = window.localStorage;
      this.token=storage.token;
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