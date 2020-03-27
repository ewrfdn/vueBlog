<template>
  <div class="contain" :class="{darkFontG0:darkmode,darkBgG0:darkmode}" ref="main">
    <div class="title-div">
      <h3 @click="gotoArticle()" v-text="title"></h3>
    </div>
    <div class="middle-div">
      <div class="img-div" ref="cover">
        <img :src="'/api/coverPhoto?size=small&id='+id" />
      </div>
      <div class="preview-div" ref="preview" @click="showFull">
        <p>
          <span v-text="preview"></span>
          <span>...</span>
          <button class="articleLink">
            阅读全文
            <i class="el-icon-arrow-down"></i>
          </button>
        </p>
      </div>
      <div class="full-context-div" ref="full">
        <article-context-vue :darkmode="darkmode" :data="context"></article-context-vue>
      </div>
    </div>

    <div class="bottom-div" ref="bottom" :class="{darkFontG1:darkmode,darkBgG0:darkmode}">
      <div class="bottom-inner-div">
        <div>
          <el-button class="star-button" @click="star()">
            <i class="el-icon-caret-top"></i>点赞
          </el-button>
        </div>
        <div>
          <button class="option" v-cloak @click="comment()">
            <i class="el-icon-s-comment"></i>
            {{commentCount}}条评论
          </button>
        </div>
        <div>
          <el-dropdown popper-append-to-body="false">
            <span class="el-dropdown-link">
              <button class="option" v-cloak @click="share()">
                <i class="el-icon-s-promotion"></i> 分享
              </button>
            </span>
            <el-dropdown-menu slot="dropdown" :class="{dropDarkmode:darkmode}">
              <el-dropdown-item
                icon="el-icon-link"
                @click.native="copyLink()"
                :class="{itemDarkmode:darkmode}"
              >复制链接</el-dropdown-item>
              <el-dropdown-item
                @click.native="sharSina()"
                class="share-item"
                :class="{itemDarkmode:darkmode}"
              >
                <img src="../ico/sina.svg" />
                新浪微博
              </el-dropdown-item>
              <el-dropdown-item
                class="share-item"
                @click.native="sharQQ()"
                :class="{itemDarkmode:darkmode}"
              >
                <img src="../ico/qq.svg" alt />
                qq空间
              </el-dropdown-item>
              <el-dropdown-item
                class="share-item"
                @click.native="sharWechat()"
                :class="{itemDarkmode:darkmode}"
              >
                <img src="../ico/wechat.svg" />
                微信
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <button class="option" v-cloak>
            <i class="el-icon-s-opportunity"></i>
            发布于 {{time}}
          </button>
        </div>
        <div class="retract-div" @click="retract()" ref="retract" >
          <p :class="{darkFontG1:darkmode}">
            <i class="el-icon-arrow-up"></i>收起
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articleContextVue from "./articleContext.vue";
export default {
  mounted(){
    window.addEventListener('scroll',()=>{
      if(this.isfixed){
        if(window.screen.availHeight+window.scrollY>this.contextY){
          this.$refs.bottom.style.position="absolute"
        }else if(window.scrollY<this.contextY0){
          this.$refs.bottom.style.position="absolute"
          // this.retract()
        }else{
          this.$refs.bottom.style.position="fixed"
        }
        
        
      }
    })
    window.addEventListener("onresize",function(){
      alert(1)
    })
  },
  props: {
    id: {
      default: 1
    },
    preview: {
      default:
        "新 MacBook Air 换上了 10nm Ice Lake CPU 和 LPDDR4X 内存, 并且也用上了 \
            MacBook Pro 16 寸上的剪刀脚键盘. 在 Geekbench 5 中, 性能相比上一代有了明显提升. 但是我们仍"
    },
    context: {},
    title: {
      default: "这是标题，这是标题"
    },
    commentCount: {
      default: 0
    },
    time: {
      default: "2020-1-1"
    },
    darkmode: {
      default: false
    },
    forceDark: {
      default: false
    },
    starNumber: {
      default: 0
    },
    viewNumber: {
      default: 0
    }
  },
  data() {
    return {
      isfixed:false,
      contextY:0,
      contextY0:0,


    };
  },
  methods: {
    shareQQ: function() {},
    shareWechat: function() {},
    shareSina: function() {},
    copyLink: function() {},
    gotoArticle: function() {
      this.$router.push("article/" + this.id);
    },
    star: function() {
      alert("star");
    },
    showFull: function(e) {
      this.$refs.cover.style.display = "none";
      this.$refs.preview.style.display = "none";
      this.$refs.full.style.display = "block";
      this.$refs.retract.style.display = "block";
      var top = this.$refs.preview.parentNode.getBoundingClientRect().top;
      if (this.$refs.full.clientHeight + top > window.screen.availHeight) {
        this.contextY=this.$refs.full.clientHeight+window.scrollY+top;
        this.contextY0=window.scrollY;
        this.$refs.bottom.style.position='fixed'
        this.isfixed=true;
      }
      alert(this.$refs.main.parentNode.clientHeight)
    },
    retract: function() {
      this.$refs.cover.style.display = "block";
      this.$refs.preview.style.display = "block";
      this.$refs.full.style.display = "none";
      this.$refs.retract.style.display = "none";
      this.isfixed=false;
    },
    comment: function() {
      alert("comment");
    }
  },
  components: {
    articleContextVue
  }
};
</script>
    
<style lang="less" scoped>
.contain {
  max-width: 650px;
  width: 100%;
  background: #fff;
  position: relative;
  padding-top: 10px;
  padding-bottom: 70px;
  border-bottom: #eee 1px solid;
  .title-div {
    margin-left: 3%;
    padding-bottom: 10px;
    h3 {
      cursor: pointer;
    }
    h3:hover {
      color: #273c75;
    }
  }
  .middle-div {
    margin-left: 3%;
    .img-div,
    .preview-div {
      overflow: hidden;
      float: left;
      overflow: hidden;
    }
    .full-context-div {
      display: none;
      padding-left: 10px;
      padding-right: 10px;
      padding-bottom: 60px;
    }
    .img-div {
      width: 30%;
      height: 110px;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 4px;
      }
      height: 100%;
    }
    .preview-div {
      width: 65%;
      padding: 10px;
      font-family: "arial";
      font-size: 0.9em;
      cursor: pointer;
      .articleLink {
        color: #1e3799;
        font-weight: bold;
        background: none;
        border: none;
        cursor: pointer;
      }
      .articleLink:hover {
        color: #00a8ff;
      }
    }
  }
  .middle-div::after {
    content: "";
    display: block;
    clear: both;
  }
  .bottom-div {
    width: 100%;
    max-width: 650px;
    background-color: #fff;
    height: 50px;
    position: absolute;
    bottom: 0px;

    display: block;
    .bottom-inner-div {
      width: 100%;
      height: 30px;
      margin-top: 10px;
      padding-left: 10px;
      div {
        float: left;
        height: 30px;
        .star-button {
          width: 90px;
          height: 30px;
          border-radius: 15px;
          padding: 0px;
          font-size: 0.9em;
        }

        .option {
          color: #606060;
          line-height: 30px;
          text-align: center;
          padding-left: 20px;
          font-size: 0.9em;
          border: none;
          background: none;
          outline: none;
          cursor: pointer;
          i {
            font-size: 1em;
            line-height: 30px;
          }
        }
        .option:hover {
          color: #808080;
        }
      }
      .retract-div {
        position: absolute;
         color: #606060;
        right: 50px;
        top: 10px;
        line-height: 30px;
        display: none;
        cursor: pointer;
        text-align: center;
      }
    }
  }
}
</style>
<style >
.share-item img {
  height: 16px;
  position: relative;
  top: 4px;
}
.share-item {
  line-height: 36px;
}
</style>