<template>
<div id="app">
    <fv-NavigationPanel class="nav" :expand=false 
    theme="dark"
     title="张晖的博客"
     :showBack="false" >
        
    </fv-NavigationPanel>
    <router-view class="out">

    </router-view>
</div>
</template>

<script>
export default {
    name: 'app',
    components: {}

}
</script>

<style lang="less">
* {
    margin: 0;
    padding: 0;
}
.out{
      margin-left:60px;
}

.nav {
    position: fixed;
    left: 0px;
    top: 0;
    z-index: 1000;

}
</style>>
