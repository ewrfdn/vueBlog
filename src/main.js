import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from '../node_modules/axios'
import 'ant-design-vue/dist/antd.css';
import echarts from 'echarts'
// import VueFluent from "../node_modules/vfluentdesign";
// import "vfluentdesign/lib/index.css";
import antd from "ant-design-vue"
Vue.config.productionTip = false
    // Vue.use(VueFluent);
Vue.use(antd)
Vue.prototype.$echarts = echarts
new Vue({
    router,

    render: h => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})