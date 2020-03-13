<template>
<div class="contain">
 <div class="upload-div">
     <el-upload
  class="upload-demo"
  ref="upload"
  action="http://localhost:8089/api/uploadPhoto"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  :on-change="change"
  list-type="picture"
  accept=".jpg"
  :auto-upload="false">
  <el-button slot="trigger" size="small" type="primary" :disabled="select">选取文件</el-button>
  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload" :disabled="upload">上传到服务器</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb,必须两个图片一起上传</div>
</el-upload>
  </div>
</div>
 
</template>

<script>
export default {
    name:"contain",
    data(){
        return{
        fileList: [],
        select:false,
        upload:true,
      }
    },
     methods: {
      handleRemove:function(file, fileList) {
        this.fileList=fileList;

      },
      handlePreview:function(file) {
        console.log(file);
      },
      submitUpload:function(){
          this.$refs.upload.submit();
          
          
      },
      overFlow:function(){ 
      },
      change:function(f,fl){
          this.fileList=fl;
      }
    },
    watch:{
          fileList:function (val) {
             
              if(val.length==2){
                   this.select=true;
                   this.upload=false;
              }else if(val.length<2){
                  this.select=false;
                  this.upload=true;
              }
              
          },
      }

}
</script>

<style lang="less">
.contain{
    max-width: 1400px;
    margin: 0 auto;
    .upload-div{
        max-width: 600px;
        margin: 100px auto;
        background: #fff;
        border-radius: 10px;
        border: #eee solid 1px;
        box-shadow: #eee 1px 1px 1px;
        padding: 15px;
        .el-upload{
            margin: 20px 20px
        }
    }
}
</style>>