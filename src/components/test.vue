<template>
<div  class="contain">
登录组件
<button v-on:click=action>
    <i v-bind:class="{'el-icon-s-fold':isOpen,'el-icon-s-open':isClose}"  ></i>
</button>
</div>
    
</template>
<script>
export default {
    data:function(){
        return{
            isOpen:true,
            isClose:false
        }
     
    },
    methods:{
        action:function () {
           this.isOpen=!this.isOpen;
           this.isClose=!this.isClose;
        }
    }

}
</script>
<style lang="less" scoped>
.contain{
    width: 80%;
    height: 300px;
    margin: auto;
}
.el-icon-s-unfold{
    font-size: 40px;
    color: #333333;
}
</style>