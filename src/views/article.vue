<template>
  <div class="main-div" :class="{darkBg0:darkmode}">
    <nav-bar :darkmode="darkmode" title="文章"></nav-bar>
    <div class="contain">
      <div class="cover-pic">
        <img :src="'/api/coverPhoto?id='+article.id" />
      </div>
      <div class="title-div" :class="{darkFont0:darkmode}">
        <div class="title">
          <h1 v-text="article.title" :class="{darkFont0:darkmode}"></h1>
        </div>
        <div class="articleInfo">
          <div class="user">
            <img src="../pic/timg.jpg" />
          </div>
          <p class="username" v-text="user.name" :class="{darkFont0:darkmode}"></p>
          <p class="profile" v-text="user.profile" :class="{darkFont0:darkmode}"></p>
          <p class="bottom-text">
            发表于
            <span v-text="article.time"></span>&nbsp;
            <span v-text="article.star"></span>人star了该文章
          </p>
        </div>
      </div>
      <article-context-vue
        :darkmode="darkmode"
        :forceDark="defaultContext"
        :data="article.context"
        :id="article.id"
      ></article-context-vue>
      <div class="context-foot">
        <div class="tag-div">
          <div :class="{darkFont1:darkmode}">
            <p v-cloak>最后更新于：&nbsp;{{article.last_change_date}}</p>
          </div>
          <tag-vue v-for="(item,index) in article.theme" :key="index" :context="item"></tag-vue>
        </div>
      </div>
    </div>
    <div class="recommend-div" :class="{darkBg1:darkmode}">
      <div class="inner-div">
        <div class="recommend-head" :class="{darkFont0:darkmode}">
          <h2>推荐阅读</h2>
          <hr />
        </div>
        <div class="card-contain">
          <recommend-card-vue class="card" :darkmode="darkmode"></recommend-card-vue>
          <recommend-card-vue class="card" :darkmode="darkmode"></recommend-card-vue>
          <recommend-card-vue class="card" :darkmode="darkmode"></recommend-card-vue>
          <recommend-card-vue class="card" :darkmode="darkmode"></recommend-card-vue>
        </div>
        <div class="left-button button" :class="{darkBg0:darkmode}">
          <i class="el-icon-arrow-left" :class="{darkFont0:darkmode}"></i>
        </div>
        <div class="right-button button" :class="{darkBg0:darkmode}">
          <i class="el-icon-arrow-right" :class="{darkFont0:darkmode}"></i>
        </div>
      </div>
    </div>
    <div class="comment-div"></div>
    <div class="foot"></div>
    <gotoTopVue :darkmode="darkmode"></gotoTopVue>
    <setting-vue :darkmode="darkmode" v-model="closeSetting"></setting-vue>
  </div>
</template>

<script>
import { getArticleData,getRecommend } from "../api/api.js";
import navBar from "../components/navBar1.vue";
import recommendCardVue from "../components/recommendCard.vue";
import gotoTopVue from "../components/gotoTop.vue";
import settingVue from "../components/setting.vue";
import tagVue from "../components/tag.vue";
import articleContextVue from "../components/articleContext.vue";
import axios from "../../node_modules/axios";
export default {
  created() {
    axios({
      method: "post",
      url: "/api/statistic",
      data: {
        type: "views",
        id: this.id
      }
    });
    this.getData()
    this.getLocalStorage();
    // axios({
    //   method: "post",
    //   url: "/api/proveUser",
    //   data: { token: this.token }
    // }).then(response => {
    //   if (response.data == "failed") {
    //   } else {
    //     var storage = window.localStorage;
    //     console.log(response);
    //     this.login = true;
    //     storage.token = response.data;
    //     this.token = response.data;
    //   }
    // });
  },
  mounted() {
    if (this.darkmode && !this.defaultContext) {
      this.changeColor();
    }
  },
  props: {
    id: {
      default: 1
    }
  },
  data() {
    return {
      darkmode: false,
      closeSetting: true,
      defaultContext: false,
      followSystem: true,
      islogin: false,
      token: "",
      article: {
        id: 0,
        title: "",
        context: "",
        time: "",
        updateTime: "",
        count: "",
        star: "",
        theme: ""
      },
      user: {
        name: "张晖",
        profile: "这是用户简介"
      }
    };
  },
  methods: {
    changeColor: function() {
      var context = document
        .getElementsByClassName("context-div")[0]
        .getElementsByTagName("p");

      for (var i = 0; i < context.length; i++) {
        context[i].className = "context-font-color";
      }
    },
    removeClass: function() {
      var context = document
        .getElementsByClassName("context-div")[0]
        .getElementsByTagName("p");
      for (var i = 0; i < context.length; i++) {
        context[i].className = "a";
      }
    },
    getData: function() {
     getArticleData({id:this.id}).then(res=> {
      this.article = eval(res);
      let temp=this.article.theme;
      this.article.theme = this.article.theme.split(" ");
      for (var i = 0; i < this.article.theme.length; i++) {
        if (!this.article.theme[i]) {
          this.article.theme.splice(i, 1);
          i--;
        }
      }
      return temp;
    }).then(res=>{
      getRecommend({
        q:res,
        id:this.id,
        n:10,
      }).then(data=>{
        alert(data)
        return data;

      })     
    }).then(res=>{
    }) ;
    },
    processData: function(data) {
      this.article = JSON.parse(data);
      this.article.theme = this.article.theme.split(" ");
      for (var i = 0; i < this.article.theme.length; i++) {
        if (!this.article.theme[i]) {
          this.article.theme.splice(i, 1);
          i--;
        }
      }
    },
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
  components: {
    navBar,
    recommendCardVue,
    gotoTopVue,
    settingVue,
    tagVue,
    articleContextVue
  },
  watch: {
    darkmode: function(val) {
      // if (!val || !this.defaultContext) {
      //   this.removeClass();
      // } else {
      //   this.changeColor();
      // }
      if (val) {
        document.body.style.background = "#242424";
      } else {
        document.body.style.background = "#fff";
      }
    },
    defaultContext: function(val) {
      // if (!val || !this.defaultContext) {
      //   this.removeClass();
      // } else {
      //   this.changeColor();
      // }
    }
  }
};
</script>

<style lang="less" scoped>
.darkFont0 {
  color: #fff !important;
}
.darkFont1 {
  color: #aaa !important;
}
.darkBg0 {
  background: #303030 !important;
}
.darkBg1 {
  background: #505050 !important;
}

.main-div {
  width: 100%;
  overflow: hidden;
  .contain {
    max-width: 1024px;
    margin: 0 auto;
    .cover-pic {
      width: 100%;
      min-height: 200px;
      img {
        margin-top: 60px;
        object-fit: cover;
        width: 100%;
        height: 100%;
        max-height: 400px;
      }
    }
    .title-div {
      height: 150px;
      position: relative;
      padding: 15px;
      .title {
        height: 40px;
        font-size: 1em;
        line-height: 40px;
        width: 100%;
        text-align: center;
      }
      .articleInfo {
        height: 90px;
        position: relative;
        .user {
          width: 50px;
          height: 50px;
          border-radius: 100%;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .username {
          font-size: 1em;
          color: #242424;
          position: absolute;
          top: 0;
          left: 60px;
          font-weight: 600;
        }
        .profile {
          position: absolute;
          top: 25px;
          left: 60px;
          font-size: 0.8em;
          color: #666;
        }
        .bottom-text {
          position: absolute;
          bottom: 10px;
          font-size: 0.8em;
          color: #666;
        }
      }
    }
    .context-foot {
      min-height: 200px;
      position: relative;
      .tag-div {
        position: absolute;
        top: 0;
        div {
          width: 200px;
          height: 50px;
          font-size: 0.8em;
          line-height: 50px;
          text-align: center;
          color: #555;
        }
      }
    }
  }

  .context-div {
    min-height: 200px;

    padding: 15px;
  }
  .recommend-div {
    width: 100%;
    height: 350px;
    background: #f5f5f5;
    position: relative;
    overflow: hidden;
    .inner-div {
      max-width: 1360px;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      position: relative;
      .recommend-head {
        max-width: 1024px;
        margin: 20px auto;
        hr {
          max-width: 100%;
          margin-top: 10px;
          height: 1px;
          background: #ddd;
          border: none;
        }
      }

      .button {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: #fff;
        box-shadow: #ccc 0px 0px 3px 1px;
        border: none;
        top: 150px;
        position: absolute;
        font-size: 1.5em;
        color: #404040;
        line-height: 50px;
        text-align: center;
        vertical-align: middle;
      }
      .left-button {
        left: 50px;
      }
      .right-button {
        right: 50px;
      }
      .card-contain {
        width: 1080px;
        height: 240px;
        overflow: hidden;
        position: absolute;
        left: 50%;
        margin-left: -540px;
        top: 90px;
        .card {
          float: left;
          margin-left: 10px;
        }

        @media screen and (max-width: 1300px) {
        }
      }
    }
  }
  .comment-div {
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>

