import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import login from "../views/login.vue"
import tank from "../views/tank.vue"
import editor from "../views/editor.vue"
import hello from "../views/view.vue"
import article from "../views/article.vue"
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: "home"
        }
    },
    {
        path: '/login',
        name: 'login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: login
    },
    {
        path: '/t',
        name: '在线制作幻影坦克',
        component: tank,
        meta: {
            title: "在线制作幻影坦克"
        },

    }, {
        path: '/editor',
        name: '在线编辑',
        component: editor,
        meta: {
            title: "编辑博客"
        }

    }, {
        path: '/view',
        name: 'v',
        component: hello,
        meta: {
            title: "test"
        },

    },
    {
        path: '/article',
        name: 'article',
        component: article,
        meta: {
            title: "文章"
        }
    }

]

const router = new VueRouter({
    routes
})

export default router