export const addStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}
export const setStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
        if (!name) return;
        window.localStorage.removeItem(name);
    }
    // ----------------------------------------------------- cookie 操作
export const setCookie = (name, value) => {
    document.cookie = name + '=' + escape(value)
}
export const getCookie = (name) => {
    let list = document.cookie.split(';')
    for (let i = 0; i < list.length; i++) {
        let temp = list[i].split('=');
        if (temp[0] === name) {
            return temp[1] || false;
        }

    }
    return false;

}