<template>
    
  <el-tag class="tag" v-text="context" @click="gotoUrl()"></el-tag>
</template>

<script>
export default {
    props:{
        context:{
            default:"tag",
        },
        url:{
            default:'#/',
        }
    },
    methods:{
        gotoUrl: function(){
            alert(this.url)
            window.location.href=this.url
        }
    }

}
</script>

<style lang="less" scoped>
.tag{
           margin-left: 20px;
           border: none;
           color:#fff  !important;
           font-weight: 600;
           background:#018;
           border-radius: 15px;
}
.tag:hover{
           background:#25E;
}
</style>>
