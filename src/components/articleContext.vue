<template>
  <div class="context-div" ref="context" v-html="data" >

  </div>
</template>

<script>
export default {
  created(){
    
  },
  updated() {
      if(this.forceDark&&this.darkmode){
            this.changeColor()
        }else{
            this.restoreColor()
        }
  },
  methods: {
    changeColor: function() {
      var context =this.$refs.context.getElementsByTagName('p');
      for (var i = 0; i < context.length; i++) {
        context[i].className = "context-font-color";
      }
     context =this.$refs.context.getElementsByTagName('li')
    for (var i = 0; i < context.length; i++) {
        context[i].className = "context-font-color";
      }
    },
    restoreColor: function() {
     var context =this.$refs.context.getElementsByTagName('p');
      for (var i = 0; i < context.length; i++) {
        context[i].className = "";
      }
     context =this.$refs.context.getElementsByTagName('li')
    for (var i = 0; i < context.length; i++) {
        context[i].className = "";
      }
    }
  },
  props: {
    darkmode: {
      default: false
    },
    forceDark: {
    },
    data:{
        default:"",
    },
    id:{
      default :1
    }
  },
  watch: {
    forceDark: function(val) {
        if(val&&this.darkmode){
            this.changeColor()
        }else{
            this.restoreColor()
        }
    }
  }
};
</script>

<style lang="less" >
    .context-div{
        width: 100%;
        overflow: hidden;
       img{
        width: 90% !important;
        margin-left: 50%;
        transform: translate(-50%,0%);
    }
    }

</style>
<style>
.context-font-color {
  color: #eee !important;
}
</style>
