<template>
  <div class="container" :class="{darkFontG1:darkmode,darkBgG0:darkmode,darkShadow:darkmode}">
    <div class="header">
        <img src="../pic/head.jpg">
    </div>
    <div class="list">
      <div class="row">
        <router-link to="/t">
          <div class="grid" :class="{darkFontG1:darkmode}">
              <img src="../ico/tank.svg" alt="">
              <span>幻影坦克在线</span>
          </div>
        </router-link>
        <router-link to="/user">
          <div class="grid" :class="{darkFontG1:darkmode}">
            <img src="../ico/tool.svg" alt="">
            <span>工具</span>
          </div>
        </router-link>
        <router-link to="/login">
          <div class="grid" :class="{darkFontG1:darkmode}">
            <img src="../ico/photo.svg" alt="">
            <span>图片</span>
          </div>
        </router-link>
      </div>
      <div class="row">
        <router-link to="/editor">
          <div class="grid" :class="{darkFontG1:darkmode}">
            <img src="../ico/github.svg" alt="">
              <span>技术列表</span>
          </div>
        </router-link>

        <router-link to="/editor">
          <div class="grid" :class="{darkFontG1:darkmode}">
           
          </div>
        </router-link>
        <router-link to="/editor">
          <div class="grid" :class="{darkFontG1:darkmode}">
            
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    darkmode: {
      default: false
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 300px;
  height: 250px;
  background: #fff;
  border-radius: 3px;
  box-shadow: #ddd 0px 0px 10px 1px;
  margin-top: 10px;
  .header {
    height: 60px;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
  }

  .list {
    height: 190px;
    width: 100%;
    .row {
      width: 100%;
      height: 50%;
      .grid {
        color: #162836;
        width: 33%;
        float: left;
        text-align: center;
        padding-top: 25px;
        position: relative;
        img {
            width: 25px;
            height: 25px;
            position: absolute;
            left: 34px;
            top: 25px;
        }
        span{
          font-size: 1em;
        position: relative;
        line-height: 25px;
          top: 25px;
        }
      }
    }
  }
}
</style>
