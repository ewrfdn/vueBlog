<template>
  <div class="container" :class="{darkFontG1:darkmode}">
    <div class='row1'>
    </div>
    <div class="row2">
    <hr>

    </div>
    <div class="row3">
    <hr>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        darkmode:{
            default:false,
        }
    }

}
</script>

<style lang="less" scoped>
.container{
    width: 300px;
    height: 300px;
    position: relative;
    margin-top: 10px;

}
</style>
