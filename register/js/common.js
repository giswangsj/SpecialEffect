function getBaseUrl() {
    return "http://192.168.86.20:4060/AdPlant-app/";
    // return "http://59.110.163.188:4050/AdPlant-app/";
}

function initFontSize() {
    let htmlFontSize = 10 * document.body.clientWidth / 375 + 'px';
    document.getElementsByTagName('html')[0].style.fontSize = htmlFontSize;
}

/**
 *
 * @param url
 * @param params
 * @param callBack
 * @constructor
 */
function HttpPost(url, params, callBack) {
    $.ajax({
        type: "POST",
        url: url,
        // data: JSON.stringify({
        //     focusTime: Date.parse(new Date())
        // }),
        data: JSON.stringify(params),
        contentType: "application/json",
        processData: false,
        success: function (data) {
            console.log("post请求success:" + data)
            if (data.code === "0000") {
                callBack(data);
            }
        },
        error: function (e) {
            console.log("post请求error:" + JSON.parse(e))
        }
    });
}

function HttpGet(url, params, callBack) {
    HttpRequest(url, params, "GET", callBack);
}

function HttpRequest(url, params, requestType, wsjCallBack) {
    let option = {
        type: requestType,
        url: url,
        data: params,
        headers: {},
        processData: false,
        success: function (data) {
            if (data === undefined) {
                let data = {};
                data.code = "200"
                wsjCallBack(data);
            } else {
                wsjCallBack(data);
            }
        },
        error: function (e) {
            let data = new Object();
            data.code = "201";
            wsjCallBack(data);
        }
    }
    $.ajax(option);
}

function isLogin() {
    let token = getToken();
    let isLogin = token !== 'null' && token !== '' && token !== undefined;
    console.log("isLogin:" + isLogin);
    return isLogin;
}

function logout() {
    if (isLogin()) {
        delToken();
        window.location.href = "login.html" + window.location.search;
    }
}

function getToken() {
    let token = localStorage.getItem("token");
    if (token !== null && token !== undefined) {
        return token;
    } else {
        return "";
    }
}

function setToken(token) {
    console.log("setToken:" + token)
    localStorage.setItem("token", token);
}

function delToken() {
    localStorage.removeItem("token");
}

function getCorpId() {
    let token = localStorage.getItem("corpId");
    if (token !== null && token !== undefined) {
        return token;
    } else {
        return "";
    }
}

function setCorpId(corpId) {
    localStorage.setItem("corpId", corpId);
}

function getAccount() {
    let account = localStorage.getItem("account");
    if (account !== null && account !== undefined) {
        return account;
    } else {
        return "";
    }
}

function setAccount(account) {
    localStorage.setItem("account", account);
}

/**
 * 获取url中的参数
 * @param key
 * @returns {string|null}
 */
function getUrlParam(key) {
    let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * 是否是手机设备
 * @returns {boolean}
 */
function isMobileClient() {
    let userAgent = navigator.userAgent;
    let Agents = ["Android", "iPhone"];
    let flag = false;
    for (let i in Agents) {
        if (userAgent.indexOf(Agents[i]) > -1) {
            flag = true;
            break;
        }
    }
    return flag;
}