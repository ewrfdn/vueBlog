// ------------------------------------------ get 请求 notoken
import { getRequest, postRequest, putRequest, deleteRequest, getRequestWithNoToken } from "../scripts/sendRequests"
export const getArticleData = (parmas) => { //获取文章数据
    return getRequestWithNoToken('/article', parmas);
}
export const getStatistic = (parmas) => { //获取站点统计数据
    return getRequestWithNoToken('/statistic', parmas);
}
export const getSearch = (parmas) => { //博客内容搜索
    return getRequestWithNoToken('/search', parmas);
}
export const getRecommend = (parmas) => { //博客内容搜索
        return getRequestWithNoToken('/recommend', parmas);
    }
    // --------------------------------------------------------------,post 请求
export const login = (parmas) => { //登录
    return postRequest('/passport', parmas);
}
export const checkToken = (parmas) => { //验证权限
    return postRequest('/proveUser', parmas);
}