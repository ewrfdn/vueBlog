<template>
  <div class="button" :class="{darkBg0:darkmode}">
      <div :class="{lightBg:darkmode}"></div>
      <div :class="{lightBg:darkmode}"></div>
      <div :class="{lightBg:darkmode}"></div>
  </div>
</template>

<script>
export default {
 props:{
     darkmode:{
         default:false
     }
 }
}
</script>

<style lang="less" scoped>
    .button{
        border: none;;
        background: #fff;
        height:40px;
        width: 40px;
        padding: 5px;
        cursor: pointer;
        div{
            background: #000;
            height: 5px;
            width: 30px;
            margin-top: 5px;
            margin-left: 10px;
            border-radius: 3px;
    }
   
    }
    .lightBg{
        background: #fff !important;
    }
</style>