<template>
  <div class="container">
    <article-card-vue :darkmode="darkmode"></article-card-vue>
    <article-card-vue :darkmode="darkmode"></article-card-vue>
  </div>
</template>

<script>
import articleCardVue from './articleCard.vue';
export default {
  props: {
    darkmode: {
      default: false
    }
  },
  methods: {
    load() {}
  },
  components:{
    articleCardVue,
  }
};
</script>

<style lang="less" scoped>
</style>
