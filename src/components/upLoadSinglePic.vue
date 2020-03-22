<template>
<div class="contain" >
  <el-upload
  ref="upload"
  :action="action"
  list-type="picture-card"
  :limit="num"
  :on-preview="handlePictureCardPreview"
  :auto-upload="false"
  :on-success="getMsg"
  :on-change="fileChange"
  :data="info"
  v-bind:limit="1"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
  <div slot="tip" class="el-upload__tip" v-text="explan"></div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</div>
</template>
<script>
export default {
     props:["action","num","explan","info"],
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        status:"",
        getFile:false
      };
     
    },
    methods: {
      handleRemove(file,fileList) {
        this.$parent.fileTrigger=!this.$parent.fileTrigger
        this.getFile= false
        console.log(file);
      },
       submitUpload:function(){
          this.$refs.upload.submit();
          
      },
      fileChange:function(file,fileList){
        this.$parent.fileTrigger=!this.$parent.fileTrigger
        if(fileList.length==1){
          this.getFile= true
        }
      },
      getMsg:function(Response,file,fileList){
        let rsp=eval(Response);
        console.log(Response);
        if(rsp.statue){
          console.log(rsp.status);
          if(rsp.status=="unsuccessful")
              this.$parent.status="500";
        }
        if(rsp.currentTask){
          this.$parent.currentTask=rsp.currentTask;
          this.$parent.unProcess=rsp.currentTask;
          this.$parent.fetchId=rsp.id;
          //
          // this.status=rsp.status;
        }
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      }

    }
    
}
</script>
<style lang="less" scoped>
.contain{
    // width: 100%;
    margin: 0 auto;
    max-width: 600px;
    background: #fff;
    border-radius: 10px;
    border: #ccc dashed 2px ;
    // box-shadow: #eee 1px 1px 1px;
    padding: 15px;
    .el-upload{
            margin: 20px 20px
        }
    .el-upload__tip{
      font-size:1em;
      color: #606060;
    }
    
}
</style>>