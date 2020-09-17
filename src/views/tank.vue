   
<template>
<div class="main">
  <head>
    <title></title>
  </head>
  <div class="header-div">
    <h1 class="tit">幻影坦克在线</h1>
  </div>
  <el-steps :active="now">
    <el-step title="选择上传图片" icon="el-icon-edit"></el-step>
    <el-step title="云端处理" icon="el-icon-upload"></el-step>
    <el-step title="查看保存" icon="el-icon-picture"></el-step>
  </el-steps>
  <uploadPhoto :action="fullurl1" explan="只能上传jpg/png文件,这为白底显示图片" ref="child" class="upload"></uploadPhoto>
  <uploadPhoto :action="fullurl2" explan="只能上传jpg/png文件,这为黑底显示图片" ref="child1" class="upload"></uploadPhoto>
  <div class="sub-div">
    <div class="message-div">
      <div class="upload-button-div">
        <el-button
          class="upload-button"
          style="margin-left: 10px;"
          size="small"
          type="primary"
          @click="submitAll"
          :disabled="disabled"
        >上传到服务器</el-button>
      </div>
      <div class="task-progress-div">
        <el-progress
          class="task-progress"
          :text-inside="true"
          :stroke-width="18"
          :percentage="processPercentage"
          :status="processStatus"
        ></el-progress>
        <p class="info">{{message}}</p>
      </div>
    </div>
    <el-button
      class="download-button"
      style="margin-left: 10px;"
      size="small"
      type="primary"
      :disabled="disableDownload"
      @click="download"
    >下载</el-button>
    <!-- <div class="clear"></div> -->
  </div>
  <div class="faq-div">
    <hr />
    <h2>常见问题</h2>
    <h3>常见失败问题问题</h3>
    <ul>
      <li>上传错文件类型情况：服务器会主动拒绝处理请求，请刷新页面重新上传</li>
      <li>显示上传成功却没开始任务： 服务器端接收文件失败 请刷新页面重新上传</li>
      <li>进度出错：服务器端未知错误，删除上传成功图片重新选择上传即可</li>
    </ul>
    <h3>什么是幻影坦克图</h3>
    <p>幻影坦克图是只在白底中显示一种图案，然后再黑底中显示另一种图案，常见于贴吧之中，幻影坦克这个词出自《红色警戒》是盟军的战斗单位</p>
    <h3>处理原理是什么</h3>
    <p>
      这种图片的原理很简单，就是alpha 混合，一般图片每个像素点有三个属性（R,G,B）来表示，而png 格式的图片除了三原色三个分量以外，还有一个Alpha
      分量，也就是透明的，带有A分量的png 图片显示出来的颜色不仅和本身颜色有关也和背景颜色有关，这种关系叫做alpah 混合
    </p>
    <p>
      alpha混合听上去很复杂，实际非常简单，其作用就是要实现一种半透明效果。假设一种不透明东西的颜色是A，另一种透明的东西的颜色是B，那么透过B去看A，看上去的颜色C就是B和A的混合颜色，可以用这个式子来近似
      <br />设B物体的透明度为alpha(取值为0-1，0为完全透明，1为完全不透明)
      <br />R(C)=alpha*R(B)+(1-alpha)*R(A)
      <br />G(C)=alpha*G(B)+(1-alpha)*G(A)
      <br />B(C)=alpha*B(B)+(1-alpha)*B(A)
      <br />
    </p>
    <p>
      由于处理的是黑白图片 所以三个分量变成了一个分量 L(灰度分量)
      <br />再黑白两个背景下我们显示的图片可以用一下两个公式表示 设白色为（1,1,1）黑色为(0,0,0)
    </p>
    <p>
      白底
      <br />R(1)=alpha*L(mix)+(1-alpha)*1
      <br />黑底
      <br />L(2)=alpha*L(mix)+(1-alpha)*0
      <br />
    </p>
    <p>
      化简后就得到下面两个方程
      <br />L(1)=alpha*(1-L(mix))+1
      <br />L(2)=alpha*L(mix)
      <br />图片的处理也就变成了已知 L1，L2,来解alpha 和mix 的值
    </p>
    <p>
      alpha=L(1)-L(2)+1
      <br />L(mix)=L(2)/alpha
    </p>
    <h3>处理过程中需要一直打开浏览器吗</h3>
    <p>是的，关闭浏览器身份核验信息丢失，你将无法获得处理后的url</p>
    <h3>是否支持彩色图片</h3>
    <p>目前只支持处理成黑白图片，彩色图片即将上线</p>
    <h3>最大输出分辨率是多少</h3>
    <p>
      最大长宽都为1800px 像素不超过5m 的图片，如果长宽有一边超过1800px
      就会被压缩
    </p>
    <h3>我上传的图片如何处理？</h3>
    <p>所有上传图片都会保留15日后被自动删除，不会有存留</p>
    <hr />
  </div>
  <calander></calander>
  <!-- <dp></dp> -->
  <chart></chart>

  <foot></foot>
</div>
</template>
<script>
import uploadPhoto from "../components/upLoadSinglePic";
import foot from "../components/foot";
import axios from "../../node_modules/axios";
import calander from "../components/diy/calendar";
import dp from "../components/diy/dp";
import chart from "../components/diy/chart";

export default {
  data() {
    return {
      url: "/api/uploadPhoto",
      fullurl1: "/api/uploadPhoto",
      fullurl2: "/uploadPhoto ",
      unProcess: 0, //未处理任务
      now: 0, //当前步骤位置
      fileTrigger: false, //文件状态改变触发器
      processStatus: "", //进度条状态
      disabled: true, //禁止上传按钮
      disableDownload: true, //禁止下载按钮
      currentTask: 0, //当前任务数量
      processPercentage: 0, //处理进度条百分比
      fetchId: "0", //上传id
      Isrun: false, //当前是否有处理任务
      message: "当前待处理任务0,当前任务位于0,预计剩余时间0", //进度条信息
      t: 0, //setInveral 控制
      status: "",
    };
  },
  methods: {
    submitAll: function () {
      this.processPercentage = 0;
      this.processStatus = "";
      this.now = 2;
      this.isRun = true;
      this.disableDownload = true;
      let key = ~~(Math.random() * 1000000000);
      this.fullurl1 = this.url + "?p=1" + "&key=" + key;
      this.fullurl2 = this.url + "?p=2" + "&key=" + key;
      let that = this;
      window.setTimeout(function () {
        that.$refs.child.submitUpload();
        that.$refs.child1.submitUpload();
      }, 100);
    },
    download: function () {
      this.now = 0;
      let url = "api/getPhoto/" + this.fetchId;
      window.location.href = url;
    },
    checkProgress: function (that) {
      let requestUrl = "api/processData?id=" + that.fetchId;
      axios({
        method: "get",
        url: requestUrl,
      })
        .then(function (res) {
          let request = eval(res.data);
          that.currentTask =
            request.currentLength == 0 ? 1 : request.currentLength;
          that.unProcess = request.unprocess;
          that.processPercentage += ~~(15 / that.currentTask);
          if (that.processPercentage > 99) {
            that.processPercentage = 99;
          }
          if (request.finished == 1) {
            that.processStatus = "success";
            that.currentTask = 0;
            that.processPercentage = 100;
            that.isRun = false;
            that.now = 3;
            that.disableDownload = false;
            clearInterval(that.t);
          }
        })
        .catch(function (error) {
          clearInterval(that.t);
          that.isRun = false;
          that.processStatus = "exception";
          that.message = "出现未知错误，请重新上传";
        });
    },
  },
  watch: {
    currentTask: function (val) {
      this.message =
        "当前待处理任务" +
        this.unProcess +
        "当前任务位于" +
        this.currentTask +
        ",预计剩余时间" +
        this.currentTask +
        "分钟";
    },
    fileTrigger: function () {
      if (
        this.$refs.child.getFile &&
        this.$refs.child1.getFile &&
        !this.isRun
      ) {
        this.now = 1;
        this.disabled = false;
      } else {
        this.disabled = true;
        this.now = 0;
      }
    },
    fetchId: function () {
      let that = this;
      this.processPercentage = 20;
      this.isRun = true;
      this.t = setInterval(function () {
        that.checkProgress(that);
      }, 10000);
    },
    status: function (val) {
      if (this.status == "500") {
        this.message = "文件提交格式错误，请重新提交";
        this.isRun = false;
      }
    },
  },
  components: {
    uploadPhoto,
    foot,
    calander,
    dp,
    chart,
  },
};
</script>

<style lang="less" scoped>
.main {
  .tit {
    color: #606660;
  }
  .header-div {
    width: 100%;
    height: 100px;
  }

  max-width: 800px;
  width: 90%;
  margin: 0px auto;
  .upload {
    margin-top: 20px;
    width: 90%;
  }
  .sub-div {
    max-width: 600px;
    margin: 10px auto;
    // .clear{
    //     clear: both;
    // }
    .message-div {
      position: relative;
      margin-top: 30px;
      .upload-button-div {
        float: left;
        width: 200px;
        height: 60px;
        .upload-button {
          font-size: 1em;
          font-weight: 400;
          width: 150px;
          height: 40px;
        }
      }
      .task-progress-div {
        width: 280px;
        height: 80px;
        margin-left: 20px;
        float: left;
        .task-progress {
          width: 220px;
        }

        .info {
          color: #242424;
          font-size: 0.7em;
        }
      }
    }

    .download-button {
      width: 80px;
      height: 40px;
      font-size: 1em;
      font-weight: 400;
    }
  }
  .sub-div::after {
    content: "";
    display: block;
    clear: both;
  }
  .faq-div {
    color: #606060;
    width: 90%;
    margin: 20px auto;
    li {
      font-size: 0.8em;
    }
    p {
      font-size: 0.8em;
    }
    h2 {
      font-size: 1.8em;
      color: #242424;
    }
    h3 {
      font-size: 1.2em;
      color: #242424;
    }
    hr {
      color: #606060;
    }
  }
}
</style>