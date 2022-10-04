/*
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-23 11:55:43
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-10-01 21:48:07
 * @FilePath: \my_acg_center\src\components\js\Setting.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function cleanHistory() {
    localStorage.removeItem("records");
    const len = localStorage.length;
    if(len === 0) {
        window.location.reload();
        return ;
    }
    for (let i = 0; i < len; ++i) {
        let key = localStorage.key(i);
        if (key.includes('History')) localStorage.removeItem(key);
    }
    window.location.reload();
}

export function cleanTabs() {
    localStorage.removeItem("Tab");
    window.location.reload();
}

export function cleanLikes() {
    localStorage.removeItem("Likes");
    window.location.reload();
}

function backUpAll() {
    const tmp = [];
    const len = localStorage.length;
    if(len === 0) {
        return tmp;
    }
    for (let i = 0; i < len; ++i) {
        tmp.push({
            name: localStorage.key(i),
            value: localStorage.getItem(localStorage.key(i))
        })
    }
    return JSON.stringify(tmp);
}

function recoverAll(data) {
    data.forEach(item => {
        localStorage.setItem(item.name, item.value);
    })
    window.location.reload();
}

export function uploadData(dataHandler, apiConfig, key) {
    startLoading(dataHandler);
    let path = apiConfig.url + '/api/upload?key=' + key + '&value=' + backUpAll();
    console.log(path);
    path = encodeURI(path)
    console.log(path);
    fetch(path, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
    }).catch(error => console.log(error))
        .finally(() => closeLoading(dataHandler));
}

export function downloadData(dataHandler, apiConfig, key) {
    startLoading(dataHandler);
    let path = apiConfig.url + '/api/download?key=' + key;
    
    console.log(path);
    path = encodeURI(path)
    console.log(path);
    fetch(path, {
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
    }).then(response => response.json())
        .then(data => recoverAll(data))
        .catch(error => console.log(error))
        .finally(() => closeLoading(dataHandler));
}

function startLoading(dataHandler) {
    dataHandler.loading = true;
}

function closeLoading(dataHandler) {
    dataHandler.loading = false;
}