<template>
<div class="home">
    <fv-NavigationPanel class="nav" :expand=false 
    :theme="theme"
     title="张晖的博客"
     :showBack="false" >
    </fv-NavigationPanel>
    <div class="background">
        <img src="../pic/timg.jpg" alt="" class="bg">
        <div :class="{dark:darkmode}" class="mask"></div>
    </div>
    <div class="out">
            <div class="star-menu">
                <div class="left-part">
                    <div class="title-div">
                      <h2 class="partTit" :class="{darkFont:darkmode,lightFont:!darkmode}"> 资讯</h2>
                    </div>
                    <div class="left-part-content">
                        <middleTile class="articleTile" color="#c33" url="/#/t" time=5 profile="打游戏完全足够：马斯克称SpaceX太空互联网延迟仅20毫秒" title="每日新闻"></middleTile>
                        <middleTile class="articleTile" color="#3c3" time=3></middleTile>
                        <middleTile class="articleTile" color="#2cc" time=3></middleTile>
                        <middleTile class="articleTile" color="#33c" time=7></middleTile>
                        <middleTile class="articleTile" color="#cc3" time=4></middleTile>
                    </div>
                </div>
                <div class='right-part'>
                  <div class="part">
                     <div class="title-div">
                      <h2 class="partTit" :class="{darkFont:darkmode,lightFont:!darkmode}"> 管理</h2>
                    </div>
                  <smallTile class="iconTile"></smallTile>
                  <smallTile class="iconTile"></smallTile>
                  <smallTile class="iconTile"></smallTile>
                  <smallTile class="iconTile"></smallTile>
                  <smallTile class="iconTile"></smallTile>
                  </div>
                  <div class="part">
                     <div class="title-div">
                      <h2 class="partTit" :class="{darkFont:darkmode,lightFont:!darkmode}"> 工具</h2>
                    </div>
                  <smallTile class="iconTile"></smallTile>
                  <smallTile class="iconTile"></smallTile>
                  <smallTile class="iconTile"></smallTile>
                  <smallTile class="iconTile"></smallTile>
                  <smallTile class="iconTile"></smallTile>
                  </div>
                </div>
            </div>

    </div>
</div>
</template>

<script>
// import bg from '../pic/time.jpg'
import middleTile from "../components/middle-tile"
import smallTile from "../components/smallTile"
export default {
    name: 'home',
    created(){
        var storage=window.localStorage;
      if(storage.theme==="dark"){
        this.darkmode=true
        this.theme="dark";
      }else{
        this.darkmode=false;
        this.theme="light";
      }
    },
    data(){
      return{
        darkmode:"true",
        theme:"dark"
      }
    },
    components: {
        middleTile,
        smallTile,
    }
}
</script>

<style lang="less" scoped>
.home {
  .nav {
    position: fixed;
    left: 0px;
    top: 0;
    z-index: 100000;
 
}
.out{
  margin-left: 60px;
  overflow-x: hidden;
}
    width: 100%;
    height: 100%;
    .darkFont{
      color: #fff !important;
    }
    .lightFont{
      color: #242424 !important;
    }
    .title-div {
        width: 100%;
        height: 50px;
        position:relative;
        top: 0;
        left: 0;
        .partTit{
          position: relative;
          left: 20px;
          top: 15px;
        }
    }
    
    .star-menu {
        max-width: 1360px;
        margin: 0 auto;

        .left-part {
            float: left;
            width: 50%;
            .articleTile{
              float: left;
              margin: 2px;
            }

              .left-part-content::after{
                   content: "";
            display: block;
            clear: both;
              }

             .left-part::after {
            content: "";
            display: block;
            clear: both;
        }
        }

        .right-part {
            float: left;
            width: 50%;
            .iconTile{
              float: left;
              margin: 3px;
            }
        }
             .right-part::after {
            content: "";
            display: block;
            clear: both;
        }
           .part::after {
            content: "";
            display: block;
            clear: both;
        }

        @media screen and (max-width: 750px) {
         .right-part,.left-part{
            float: none ;
            width: 90%;
         }
          
        }

        .star-menu::after {
            content: "";
            display: block;
            clear: both;
        }
    }
      
    .background {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;

        .mask {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(255, 255, 255, 0.5);
        }
        .dark{
          background: rgba(24, 24, 24, 0.5);
        }

        .bg {
            width: 100%;
            object-fit: cover;
            height: 100%;
        }

        // background: url('../pic/time.jpg');
    }
}
</style>
