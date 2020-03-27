<template>
  <div class="container">
  
    <article-card-vue 
    v-for="(item,index) in articleList" :key="index"
    :id="item.id"
    :title="item.title"
    :context="item.context"
    :preview="item.preview"
    :starNumber="item.star"
    :commentCount="item.commentCount"
    :time="item.time"
    :darkmode="darkmode"></article-card-vue>
  </div>
</template>

<script>
import articleCardVue from './articleCard.vue';
import axios from "../../node_modules/axios"
export default {
  created(){
    this.load()
  },
  data(){
    return{
      articleList:[],
      url:"/api/article?t=list&sort=desc",
      start:1,
      number:5,
    }
  },
  props: {
    darkmode: {
      default: false
    }
  },
  methods: {
    load:function(){
      var url=this.url+"&s="+this.start+"&n="+this.number;
      console.log(url)
      var that=this
      axios({
        method:"get",
        url:url
      }).then((res)=>{
        var list=eval(res.data)
        for(var i=0;i<list.length;i++){
          this.articleList.push(JSON.parse(list[i]))
        }
      })
    }
  },
  components:{
    articleCardVue,
  }
};
</script>

<style lang="less" scoped>
</style>
