<template>
  <div class="container">
    <article-card-vue
      v-for="(item,index) in articleList"
      :key="index"
      :id="item.id"
      :title="item.title"
      :context="item.context"
      :preview="item.preview"
      :starNumber="item.star"
      :commentCount="item.commentCount"
      :time="item.time"
      :darkmode="darkmode"
      :views="item.views"
    ></article-card-vue>
    <card-frame-work-vue :darkmode="darkmode" :display="showLoad"></card-frame-work-vue>
  </div>
</template>

<script>
import articleCardVue from "./articleCard.vue";
import axios from "../../node_modules/axios";
import cardFrameWorkVue from "./cardFrameWork.vue";
export default {
  created() {
    this.url=this.$route.params.url||"/api/article?t=list&sort=desc"
    this.load();
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (this.loadAll) {
        if (
          window.scrollY + window.innerHeight >=
          document.body.clientHeight + 40
        ) {
          this.load();
        }
      }
    });
  },
  data() {
    return {
      articleList: [],
      url: "/api/article?t=list&sort=desc",
      start: 0,
      number: 5,
      showLoad: false,
      loadAll: true
    };
  },
  props: {
    darkmode: {
      default: false
    },
    u:{
      default:''
    },
  },
  methods: {
    load: function() {
      this.showLoad = true;
      var url = this.url + "&s=" + this.start + "&n=" + this.number;
      this.start += this.number;
      var that = this;
      axios({
        method: "get",
        url: url
      }).then(res => {
        if (res.data == "") {
          this.loadAll = false;
        }
        var list = eval(res.data);
        for (var i = 0; i < list.length; i++) {
          this.articleList.push(JSON.parse(list[i]));
        }
        this.number = 3;
        this.showLoad = false;
      });
    }
  },
  components: {
    articleCardVue,
    cardFrameWorkVue
  }
};
</script>

<style lang="less" scoped>
</style>
