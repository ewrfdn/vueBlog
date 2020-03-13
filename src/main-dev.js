import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from '../node_modules/axios'
import VueFluent from "../node_modules/vfluentdesign";
import "vfluentdesign/lib/index.css";
Vue.config.productionTip = false
Vue.use(VueFluent);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})