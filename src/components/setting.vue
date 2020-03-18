<template>
  <div class="setting" :class="{darkFont0:darkmode,darkBg:darkmode,closed:closeSetting}">
    <div class="close" @click="close()" :class="{darkFont0:darkmode}">
      <I class="el-icon-close"></I>
      
    </div>
    <div class="left-part">
        <ul class="option">
        <li>主题</li>
          <li>
            <el-switch
              style="display: block"
              v-model="darkTheme"
              active-color="#13ce66"
              active-text="light "
              inactive-text="dark"
            ></el-switch>
          </li>
        </ul>
      </div>
      <div class="right-part"></div>
  </div>
</template>

<script>
export default {
  props: {
    darkmode: {
      default: false
    },
    value: {
        default:true,
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
      darkTheme:this.darkmode,
    };
  },
  watch: {
    darkTheme: function(val) {
      this.$parent.darkmode=val;
      var storage=window.localStorage;
      if(val){
          storage.theme="dark";
      }else{
          storage.theme="light";
      }
    },
    value:function(val){
        this.closeSetting=val;
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
  .left-part,
  .right-part {
    width: 50%;
    height: 100%;
    float: left;
    padding:15px
  }
  .left-part{
      .option{
          li{
              list-style: none;
              margin-top: 10px;
              font-size: 1em;
              font-weight:600;
          }
      }
  }
}
.closed {
  display: none;
}
</style>