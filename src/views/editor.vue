<template>
<div>
<navBar></navBar>
  <div class="mainPage" >
    <div class="face-photo">
      <uploadPhoto explan="请上传封面" class="uploadPhoto"  :action="photoAction" num='' ref="pic" ></uploadPhoto>
    </div>
    <div class="form-div">
      <form action="/api/article" id="submit-form" method="post">
        <el-input  placeholder="请输入标题" v-model="submitForm.title" name=title
         class="input-tit" 
         prefix-icon="el-icon-search">
        </el-input>
        <input type="hidden" name="context" v-model="submitForm.context" >
        <input type="hidden" name="preview"  v-model="submitForm.preview">
        <el-input type="text" name="theme" placeholder="请输入主题" v-model="submitForm.theme" class='theme' ></el-input>
      </form>
    </div>
    <div class="editor">
      <div id="toolBar"></div> 
      <div id="context">
          <p>请输入内容</p>
      </div>
    </div>
    <div class="submit-div"><el-button @click="submitHandle()"> 提交文章</el-button></div>
  </div>
</div>
</template>

<script>
var E = require("wangeditor");
import uploadPhoto from "../components/upLoadSinglePic";
import navBar from "../components/navBar1"
import axios from '../../node_modules/axios'
export default {
  mounted() {
    this.editor = new E("#toolBar", "#context");
    this.editor.customConfig.colors = [
      "#000000",
      "#eeece0",
      "#1c487f",
      "#4d80bf",
      "#c24f4a",
      "#8baa4a",
      "#7b5ba1",
      "#46acc8",
      "#f9963b",
      "#ffffff"
    ];
    this.editor.customConfig.onfocus=this.onEdiorFocus
    this.editor.customConfig.onblur=this.onEdiorBlur
    this.editor.create();

  },
  data() {
    return {
      moibleView: false,
      editor:null,
      photoAction:"/api/coverPhoto",
      submitForm:{
        title:"",
        preview:"",
        context:"",
        theme:"",
      },
    };
  },
  methods: {
    changeSize: function() {
      if (document.body.clientWidth < 600) {
        this.editor.customConfig.menus = [
          "bold", // 粗体
          "fontSize", // 字号
          "fontName", // 字体
          "foreColor", // 文字颜色
          "link", // 插入链接
          "list", // 列表
          "justify", // 对齐方式
          "quote", // 引用
          "image", // 插入图片
          "table", // 表格
          "code" // 插入代码
        ];
        // this.editor.create()
      }
    },
    submitHandle:function(){
      this.getPreview()
      this.checkContext()
      axios({
          method: 'post',
          url: '/api/article',
          data:this.submitForm,
          }).then( (response)=> {
          this.photoAction="/api/coverPhoto"+"?id="+response.data
            setTimeout(() => {
            this.$refs.pic.submitUpload();
            }, 100);
         })
    },
    onEdiorFocus:function(){

    },
    onEdiorBlur:function(){
      this.submitForm.context=this.editor.txt.html()
      this.getPreview()
      this.checkContext()

    },
    checkContext:function(){
      this.submitForm.context=this.editor.txt.html().split("'").join("\\'")
    },
    getPreview:function(){
      this.submitForm.preview=this.editor.txt.text();
      if(this.submitForm.preview.length>100){
        this.submitForm.preview=this.submitForm.preview.slice(0,100)
      }
    }

  },
  computed:{
  
  },
  components: {
    uploadPhoto,
    navBar,
  },
  watch: {
    moibleView: function() {}
  }
};
</script>

<style lang="less"  scoped>

.w-e-toolbar{
  flex-wrap:wrap;
}

.mainPage {
  max-width: 1024px;
  margin: 0px auto;
  .face-photo {
    width: 80%;
    margin: 100px auto;
    min-height: 100px;
    .uploadPhoto{
      max-width: 1024px;
    }
  }
   .form-div {
    width: 80%;
    margin: 50px auto;
    .input-tit{
      width: 60%;
      font-size: 1.5em;
      
    }
    .input-tit /deep/ title{
      height: 100%;
    }
    .theme{
      width: 20%;
      margin-left: 15%;
      font-size: 1em;
    }
  }
  .editor {
    width: 80%;
    margin: 30px auto;
    #toolBar {
      width: 100%;
      height: 100px;
    }
    #context {
      min-height: 300px;
      border: 1px solid #ccc;
      margin-top: 50px;
    }
  }
  .submit-div{
    margin: 30px auto;
    width: 100%;
   
  }
  .submit-div>button{
    width:160px;
    height: 50px;
    position: relative;
    left: 50%;
    margin-left: -80px;
    font-size: 1em;
    font-weight: 400;
  }

  
}
@media screen and(max-width: 600px)  {
    .face-photo,.editor,.form-div{
        width: 90% !important;
    }
}
</style>
