<template>
  <div class="setting" :class="{darkFont0:darkmode,darkBg:darkmode,closed:closeSetting}">
    <div class="close" @click="close()" :class="{darkFont0:darkmode}">
      <i class="el-icon-close"></i></div>
    <div class="setting-tit">
      <h3>setting</h3>
    </div>
    <div class="left-part">
      <ul class="option">
        <li>主题</li>
        <li>
          <el-switch
            style="display: block"
            v-model="darkTheme"
            active-color="#13ce66"
            active-text="dark "
            inactive-text="light"
            :disabled="followSystem||autoTheme"
          ></el-switch>
        </li>

        <li>强制正文白色</li>
        <li>
          <el-tooltip class="item" effect="dark" content="黑暗模式下文章正文强制转换为白色" placement="top-start">
            <el-switch
              style="display: block"
              v-model="defaultContext"
              active-color="#13ce66"
              active-text="on "
              :disabled="!darkmode"
              inactive-text="off"
            ></el-switch>
          </el-tooltip>
        </li>
        <li>跟随系统主题</li>
        <li>
           <el-tooltip class="item" effect="dark"  placement="top-start">
               <div slot="content">仅支持window10和macOS10.14.4 <br>平台部分浏览器</div>
            <el-switch
              style="display: block"
              v-model="followSystem"
              active-color="#13ce66"
              active-text="on "
              inactive-text="off"
            ></el-switch>
          </el-tooltip>
        </li>
        <li>按照时间自动切换主题</li>
        <li>
          <el-switch
            style="display: block"
            v-model="autoTheme"
            active-color="#13ce66"
            active-text="on "
            inactive-text="off"
            :disabled="followSystem"
          ></el-switch>
        </li>
      </ul>
    </div>
<div class="right-part">
      <ul class="option">
        <li>*主页</li>
        <li>
            <el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">开始菜单模式推荐chrome 80以上内核,<br/>其他浏览器可能会有显示或性能问题</div>
            <el-switch
              style="display: block"
              v-model="startMenu"
              active-color="#13ce66"
              active-text="传统 "
              inactive-text="开始菜单模式"
            ></el-switch>
          </el-tooltip>
        </li>
        <li>*禁用部分动画效果</li>
        <li>
          <el-switch
            style="display: block"
            v-model="reduceEffect"
            active-color="#13ce66"
            active-text="on "
            inactive-text="off"
          ></el-switch>
        </li>
        <li>*使用pwa模式</li>
        <li>
            <el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">pwa模式下网站内容会默认存储在本地，<br/>可离线访问，大大加快下次访问速度</div>
            <el-switch
              style="display: block"
              v-model="darkTheme"
              active-color="#13ce66"
              active-text="off "
              inactive-text="on"
            ></el-switch>
          </el-tooltip>
        </li>
      </ul>
    </div>
    <div class="setting-foot">
      <p>*项目需要下次启动时才能生效</p>
    </div>
  </div>
</template>

<script>
export default {
    created(){
        var storage = window.localStorage;
        this.followSystem=storage.followSystem=="false"?false:true;
        this.startMenu=storage.startMenu=="true"?true:false;;
        this.defaultContext=storage.defaultContext=="true"?true:false;;
        this.reduceEffect=storage.reduceEffect=="true"?true:false;;
        this.autoTheme=storage.autoTheme=="true"?true:false;
    },
  props: {
    darkmode: {
    },
    value: {
      default: true
    }
  },
  methods: {
    close: function() {
      this.closeSetting = true;
      this.$emit("input", this.device);
    }
  },
  data() {
    return {
    closeSetting: this.value,
    darkTheme: this.darkmode,
    defaultContext:true,
    followSystem:true,
    reduceEffect:false,
    startMenu:false,
    autoTheme:false,
    hiddenDefaultContext:false,
    };
  },
  watch: {
    darkTheme: function(val) {
      var storage = window.localStorage;
      this.$parent.darkmode = val;
      if (val) {
        storage.theme = "dark";
        this.defaultContext=true;
      } else {
        storage.theme = "light";
        this.defaultContext=false;
      }
    },
    value: function(val) {
      this.closeSetting = val;
    },
    autoTheme:function(val){
      var storage = window.localStorage;
        storage.autoTheme=val;
        if(val){
            var h=new Date().getHours();
            if(h>20||h<8){
                this.darkTheme=true;
                this.$parent.darkmode=true
            }else{
                this.darkTheme=false;
                this.$parent.darkmode=false
            }
        }
    },
    followSystem:function(val){
        var storage = window.localStorage;
        this.$parent.followSystem = val;
        if(val){
        storage.followSystem=true;
           if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.$parent.darkmode = val;
                this.darkTheme=true;
                }else{
            storage.followSystem=false;
            this.darkTheme=false;
        }
        }else{
           storage.followSystem=false;
        }
            
        
    },
    startMenu:function(val){
      var storage = window.localStorage;
        storage.startMenu=val;
    },
    reduceEffect:function(val){
        var storage = window.localStorage;
        storage.reduceEffect=val
    },
    defaultContext:function(val){
        var storage = window.localStorage;
        storage.defaultContext=val
        this.$parent.defaultContext=val;
    }
  }
};
</script>

<style lang="less" scoped>
.darkFont0 {
  color: #ccc !important;
}

.darkBg {
  background: #404040 !important;
  box-shadow: #111 0px 0px 5px 1px !important;
}
.setting {
  max-width: 500px;
  max-height: 600px;
  width: 80%;
  height: 50%;
  position: fixed;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: #ddd 0px 0px 10px 1px;
  .close {
    width: 30px;
    height: 30px;
    position: absolute;
    text-align: center;
    line-height: 30px;
    right: 10px;
    font-size: 30px;
    top: 10px;
    font-weight: 900;
    color: #222;
  }
  .close:hover {
    color: crimson !important;
  }
  .setting-tit {
    height: 10%;
    width: 100%;
    h3 {
      text-align: center;
      line-height: 50px;
    }
  }
   .setting-foot {
    height: 10%;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    p{
      font-size: 0.8em;
    }
  }
  .left-part,
  .right-part {
    width: 40%;
    height: 70%;
    float: left;
    padding: 15px;
    .option {
      li {
        list-style: none;
        margin-top: 10px;
        font-size: 1em;
        font-weight: 600;
      }
    }
  }
  
}
.closed {
  display: none;
}
</style>