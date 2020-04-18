<template>
  <div class="main">
    <panel-card-vue :darkmode="darkmode" class="frist"></panel-card-vue>
    <info-card-vue :darkmode="darkmode" class="info-card"></info-card-vue>
    <tool-panel-vue :darkmode="darkmode"></tool-panel-vue>
  </div>
</template>

<script>
import panelCardVue from "./panelCard.vue";
import infoCardVue from "./infoCard.vue";
import toolPanelVue from "./toolPanel.vue";
export default {
  props: {
    darkmode: {
      default: false
    }
  },
  components: {
    panelCardVue,
    infoCardVue,
    toolPanelVue
  }
};
</script>

<style lang="less" scoped>
.main {
    margin: 0 auto;
    max-width: 300px;
  .info-card {
    margin-top: 10px;
  }
}
@media screen and (max-width: 660px) {
    .frist{
        margin-top: 30px;
    }
}
</style>