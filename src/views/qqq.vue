   
<template>

<div class="main" >
 <head>
     <title></title>
 </head>
    <h1 class="tit">幻影坦克在线</h1>
    <div class="header-div">

    </div>
    <el-steps :active="now">
  <el-step title="选择上传图片" icon="el-icon-edit"></el-step>
  <el-step title="云端处理" icon="el-icon-upload"></el-step>
  <el-step title="查看保存" icon="el-icon-picture"></el-step>
</el-steps>
 <uploadPhoto :action="fullurl1"  
  explan="只能上传jpg/png文件,必须两个图片一起上传,这为白底显示图片"
  ref="child"></uploadPhoto>
 <uploadPhoto :action="fullurl2" 
  explan="只能上传jpg/png文件,必须两个图片一起上传，这为黑底显示图片"
  ref="child1"></uploadPhoto>
<div class="message-div">
    <div class="upload-button-div" >
        <el-button class="upload-button" style="margin-left: 10px;" size="small" type="success" @click="submitAll" :disabled="disabled" >上传到服务器</el-button>
    </div>
    <div class="task-progress-div">
        <el-progress class="task-progress" :text-inside="true" :stroke-width="18" :percentage="processPercentage" :status="processStatus"></el-progress>
        <p class="info">{{message}}</p>
    </div>
</div>
<el-button class="download-button" style="margin-left: 10px;" size="small" type="success" @click="download" :disabled= "disableDownload">下载</el-button>
<chart></chart>
</div>

</template>
<script>
import uploadPhoto from "../components/upLoadSinglePic"
import axios from '../../node_modules/axios'
import chart from "../components/diy/chart"
export default {
    data(){
        return{
           url:"http://localhost:8089/api/uploadPhoto",
           fullurl1:"http://localhost:8089/api/uploadPhoto",
           fullurl2:"http://localhost:8089/uploadPhoto ",
           unProcess:0,
           now:0,
           fileTrigger:false,
           processStatus:"",
           disabled:true,
           disableDownload:true,
           currentTask: 0,
           processPercentage:0,
           fetchId:"0",
           Isrun:false,
           message:"当前待处理任务0,当前任务位于0,预计剩余时间0",
           t:0
        }
    },
    methods:{
         submitAll:function(){
         this.processPercentage=0;
         this.processStatus=""
          this.isRun=true;
          this.now=2;
          this.disableDownload=true
          let key=~~(Math.random()*1000000000);
          this.fullurl1=this.url +"\?p=1"+"\&key="+key;
          this.fullurl2=this.url +"\?p=2"+"\&key="+key;
          let that=this;
          window.setTimeout(function(){
           that.$refs.child.submitUpload();
           that.$refs.child1.submitUpload();
          },100)
          window.setTimeout(function(){
              that.processPercentage=20
          },2000)
            this.t=setInterval(function(){
                that.checkProgress(that);
               
            },10000)
      },
      download:function(){
          this.now=0;
          let url=this.host+"/api/getPhoto/"+this.fetchId
          window.open(url)
      },
      checkProgress:function(that){
          let requestUrl="http://localhost:8089/api/uploadPhoto"+that.fetchId
          axios({
              method:"get",
              url:requestUrl
          }).then(function(res){
              console.log(res.data)
              let request=eval(res.data)
              console.log(request.currentLength)
              console.log(request.finished)
              that.currentTask=request.currentLength==0?1:request.currentLength;
              that.unProcess=request.unprocess;
              that.processPercentage+=~~(15/that.currentTask)
              if(that.processPercentage>99){
                  that.processPercentage=99;
              }
               if(request.finished==1){
                   that.processStatus="success"
                   that.currentTask=0;
                   that.processPercentage=100
                   that.isRun=false;
                   that.now=3;
                   that.disableDownload=false;
                    clearInterval(that.t)
                }

          }).catch(function(error){
              clearInterval(that.t)
              that.isRun=false;
              that.processStatus="exception"
              that.message="出现未知错误，请重新上传"
          })
      }
    },
    watch:{
        currentTask:function(val){
            // this.processPercentage=99/this.currentTask>99?99:99/this.currentTask;
            this.message="当前待处理任务"+this.unProcess+"当前任务位于"+this.currentTask+",预计剩余时间"+this.currentTask+"分钟";
           
        },
        fileTrigger:function(){
            if(this.$refs.child.getFile&&this.$refs.child1.getFile&&!this.isRun){
                this.now=1
                this.disabled=false;
            }else{
                this.disabled=true;
            }
        }
        
    },
    components:{
        uploadPhoto,
        chart
    }
}

</script>

<style lang="less" scoped>
.main{
    .tit{
        color: #66CCFF;
    }
    .header-div{
        width: 100%;
        height: 100px;
    }
    max-width: 800px;
    margin: 0px auto;
    .message-div{
        position: relative;
        margin-top: 30px;
        .upload-button-div{
             float: left;
              width: 200px ;
             height: 60px;
             .upload-button{
            width: 150px;
            height: 40px;
                }
        }
        .task-progress-div{
            width: 280px;
            height: 80px;
            margin-left: 20px;
            float:left;
             .task-progress{
             width: 220px;
                    }
            
        .info{
        color: #606060;
        font-size: 0.7em
        }
         
     }
    }
    .download-button{
            width: 60px;
             height: 40px;
            }

   
}
</style>