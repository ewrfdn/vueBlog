<template>
  <div class="main">
    <hello-world-vue></hello-world-vue>
    <button @click="cl">点击运行</button>
  </div>
</template>

<script>
import HelloWorldVue from '../components/HelloWorld.vue'
export default {
  methods:{
    cl:function () {
      let a=document.createElement('div');
      a.className="test";
      document.body.appendChild(a)
    }
  },
components:{
  HelloWorldVue
}
}
</script>

<style>

</style>