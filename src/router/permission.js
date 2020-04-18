import { getCookie, getStore, setCookie, addStore } from '../scripts/storage'
import { checkToken, login } from '../api/api'
export const routeGuard = (to, from, next) => {
    let islogin = getCookie("islogin")
    if (islogin !== 'true') {
        let uid = getStore('uid');
        let token = getStore('token');
        if (uid !== null) {
            checkToken({ uid: uid, token: token }).then((res) => {
                res = eval(res);
                if (res.status === 200) {
                    setCookie("islogin", 'true')
                    if (res.isTimeOut === 1) {
                        addStore("token", res.token)
                    }
                    next()
                } else if (to.matched.some(res => res.meta.islogin)) {
                    next({ name: 'login' })
                } else {
                    next()
                }
            })
        } else {
            if (to.matched.some(res => res.meta.islogin)) {
                next({ name: 'login' })
            } else {
                next()
            }
        }

    } else {
        next()
    }
}