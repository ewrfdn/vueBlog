import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import { routeGuard } from './permission'
const login = () =>
    import ("../views/login.vue")
const tank = () =>
    import ("../views/tank.vue")
const editor = () =>
    import ("../views/editor.vue")
const article = () =>
    import ("../views/article.vue")
const index = () =>
    import ("../views/index.vue")
const articleList = () =>
    import ("../components/articleList.vue")
const hot = () =>
    import ("../components/hot.vue")
import more from "../components/toolList.vue"
import setting from "../views/manage.vue"
Vue.use(VueRouter)


const routes = [{
        path: '/',
        name: 'home',
        component: index,
        redirect: "/home",
        meta: {
            title: "home",
            islogin: false,
        },
        children: [{
            path: 'home',
            name: "home",
            component: articleList,
        }, {
            path: 'hot',
            name: 'hot',
            component: hot,
        }, ]
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: 'login',
            islogin: false,
        }
    },
    {
        path: '/t',
        name: 'tank',
        component: tank,
        meta: {
            title: "在线制作幻影坦克"
        },
    }, {
        path: '/editor/:a_id?',
        name: 'editor',
        component: editor,
        props: true,
        meta: {
            title: "编辑博客",
            islogin: true,
        }
    }, {
        path: '/view',
        name: 'v',
        component: articleList,
        meta: {
            title: "test"
        },

    },
    {
        path: '/article/:id',
        name: 'article',
        component: article,
        props: true,
        meta: {
            title: "文章"
        }
    }, {
        path: '/setting',
        name: 'setting',
        component: setting,
        meta: {
            title: "管理",
            islogin: true,

        },
        children: [{
            path: '/view',
            component: articleList,
        }, {
            path: '/article',
            component: hot,
        }, {
            path: '/comment',
            component: more,
        }, ]
    },

]

const router = new VueRouter({
    routes
})


export default router
router.beforeEach(routeGuard)