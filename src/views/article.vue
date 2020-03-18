<template>
  <div class="main-div" :class="{darkBg0:darkmode}">
    <nav-bar :darkmode="darkmode"></nav-bar>
    <div class="contain">
      <div class="cover-pic">
          <img src="../pic/timg.jpg">
      </div>
      <div class="title-div" :class="{darkFont0:darkmode}">
          <div class="title">
              <h1 v-text="article.title" :class="{darkFont0:darkmode}" ></h1>
          </div>
          <div class="articleInfo">
              <div class="user">
                  <img src="../pic/timg.jpg" >
              </div>
              <p class="username" v-text="user.name" :class="{darkFont0:darkmode}"></p>
              <p class="profile" v-text="user.profile" :class="{darkFont0:darkmode}"></p>
            <p class="bottom-text" >发表于<span v-text="article.time"></span>&nbsp;<span v-text="article.star"></span>人star了该文章</p>
          </div>
      </div>
      <div class="context-div" v-html="article.context"></div>
      <div class="context-foot"></div>
    </div>
    <div class="recommend-div" :class="{darkBg1:darkmode}">
      <div class="inner-div">
        <div class="card-contain">
          <recommend-card-vue class="card" :darkmode="darkmode"></recommend-card-vue>
          <recommend-card-vue class="card" :darkmode="darkmode"></recommend-card-vue>
          <recommend-card-vue class="card" :darkmode="darkmode"></recommend-card-vue>
          <recommend-card-vue class="card" :darkmode="darkmode"></recommend-card-vue>
        </div>
      <div class="left-button button" :class="{darkBg0:darkmode}">
          <i class="el-icon-arrow-left" :class="{darkFont0:darkmode}"></i>
      </div>
      <div class="right-button button" :class="{darkBg0:darkmode}" >
          <i class="el-icon-arrow-right" :class="{darkFont0:darkmode}"></i>
      </div>
       </div>
    </div>
    <div class="comment-div"></div>
    <div class="foot"></div>
    <gotoTopVue :darkmode="darkmode"></gotoTopVue>
    <setting-vue :darkmode="darkmode" v-model="closeSetting" ></setting-vue>
  </div>
</template>

<script>
import navBar from "../components/navBar1.vue";
import recommendCardVue from "../components/recommendCard.vue";
import gotoTopVue from '../components/gotoTop.vue';
import settingVue from '../components/setting.vue';
export default {
    created(){
      var storage=window.localStorage;
      if(storage.theme==="dark"){
        this.darkmode=true
      }else{
        this.darkmode=false
      }
    },
    data(){
        return{
            darkmode:true,
            closeSetting:true,
            article:{
                title:'这是文章标题',
                context:'默认文章内容',
                time:'1970-1-1',
                count:'0',
                star:'0',
                theme:'theme'
            },
            user:{
                name:"张晖",
                profile:"这是用户简介"
            }
        }
    },
  components: {
    navBar,
    recommendCardVue,
    gotoTopVue,
    settingVue,
  },
  watch:{
    
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
.darkBg0{
    background: #303030 !important;}
.darkBg1{
    background: #505050 !important;
    }   

.main-div {
  width: 100%;

  .contain {
    max-width: 1024px;
    margin: 0 auto;
    .cover-pic {
      width: 100%;
      min-height: 200px;
      img{
        margin-top: 60px;
          object-fit: cover;
          width: 100%;
          height: 100%;
          max-height: 400px;
      }

    }
    .title-div{
        height: 150px;
        position: relative;
    padding: 15px;
        .title{
            height: 40px;
            font-size: 1em;
            line-height: 40px;
            width:100%;
            text-align:center;
        }
        .articleInfo{
            height: 90px;
            position: relative;
            .user{
                width: 50px;
                height: 50px;
                border-radius: 100%;
                overflow: hidden;
                
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .username{
                font-size: 1em;
                color: #242424;
                position: absolute;
                top: 0 ;
                left: 60px;
                font-weight: 600;
            }
            .profile{
                position: absolute;
                top:25px;
                left: 60px;
                font-size:0.8em;
                color: #666;
            }
            .bottom-text{
                position: absolute;
                bottom: 10px;
                font-size:0.8em;
                color: #666;
            }
        }
    }
  }
 
  .context-div{
    min-height:20000px;

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
