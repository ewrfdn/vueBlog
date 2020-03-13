<template>
  <div id="nav">
      <el-row :gutter="30">
  <el-col :span="6">
 <div class="grid-content bg-purple"></div>
  </el-col>
  <el-col :span="14">
    <div>
    <el-menu :default-active="activeIndex"  class="navList"  mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" class="item">home
            
        </el-menu-item>
        <el-menu-item index="2" class="item">about</el-menu-item>
        <el-menu-item index="3" class="item" >list</el-menu-item>
        <el-menu-item index="4" class="item">tool</el-menu-item>
        </el-menu>
    </div>    
    <div>
      <el-input  placeholder="请输入内容"></el-input>
    </div>
   
  </el-col>
  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
</el-row>
  </div>
</template>

<script>
export default {
    data(){
      return{
        activeIndex: '1',
      }
      
    },
    methods:{
      handleSelect:function () {
        
      },
      

    }

}
</script>


<style lang="less" >
#nav{
    width: 100%;
    height: 80px;
    background: #fff;
    position: fix ;
    top: 0;
    // border-bottom: #99a9bf solid 1px;
    .el-row {
    margin-bottom: 0px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-input{
    margin-top: 20px;
  }
  .navList{
              
      .el-menu-item{
        float: right;
        padding:0 10px;
        text-align: center;
        
      }
      .item{
          font-size:1.3em;
          width: 80px;
          margin-left: 20px;
          
         
      }
  }
  .el-col {
    border-radius: 4px;
  }
  .el-col>div{
    float: right;
  }

 
  .grid-content {
    border-radius: 4px;
    height: 80px;
  }
  .row-bg {
    padding: 0px 0;
  }
}
</style>