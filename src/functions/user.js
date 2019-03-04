const storage = weex.requireModule('storage') || {};
const navigator = weex.requireModule('navigator') || {};
let tempdata = {};
import {getEntryUrl} from "./index";

/**
 * 判断用户是否登录
 *
 * @param path
 * @param body
 * @param done
 * @param fail
 * @returns {boolean}
 */
export function isUserLogined (path, body,done = () => {}, fail = () => {}) {
    tempdata.login = 0;
    storage.getItem('login', event => {
        tempdata.login = event.data;
    });
    console.log(tempdata.login);
    return tempdata.login ===1 || tempdata.login === "1";
}

export function login () {
    storage.setItem("login",1);
    navigator.push({url: getEntryUrl('pages/Home'), animated: "true"})
}

export function logout () {
    storage.removeItem('login')
    navigator.push({url: getEntryUrl('pages/Login'), animated: "true"})
}