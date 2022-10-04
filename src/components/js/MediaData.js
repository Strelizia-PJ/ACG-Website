// 加载Api
// 参数(/2022-7/; Proxy对象含url: 'https://acg-api.hlz.ink:49999')
// 返回promise对象
function loadApi(path, apiConfig) {
    return fetch(apiConfig.url + path, {
        method: 'GET',
        // mode: 'cors',   // 跨域请求
        // credentials: 'omit' // 不发送cookies
    });
}

// 提取根目录信息
// 参数(根目录的数组, 变量为id, mimeType, modifiedTime, name)
// 返回一个对象数组, 变量为date, path, season
function extractRootContent(response) {
    const tmp = [];
    response["files"].forEach(
        item => {
            if (item["name"] !== "sw.js") 
                tmp.push(
                    {   season: formatRootDate(item["name"]),
                        date: toDate(item["name"]),
                        path: item["name"] + '/' }) });
    // console.log(tmp.sort((a, b) => b.date - a.date));
    return tmp.sort((a, b) => b.date - a.date);
    
}

// 格式化根目录日期
// 参数(名为 2022-7 或 ANi 的文件夹名)
// 返回 xxxx 年 xx 月 或 ANi 文件夹的自定义名字
function formatRootDate(item) {
    // console.log(item);
    if (item === "ANi")
        return "貌似是优秀番剧合集"
    const tmp = item.split('-');
    if (tmp[1].length == 1) tmp[1] = '0' + tmp[1];
    {
        // console.log(`${tmp[0]} 年 ${tmp[1]} 月`);
        return `${tmp[0]} 年 ${tmp[1]} 月`;
    }
}

// 把传入的中文日期, 转为格式化日期
// 参数(名为 2022-7 或 ANi 的文件夹名)
// 返回转化后的Date生成时间格式, 如 Fri Jul 01 2022 00:00:00 GMT+0800 (中国标准时间)
function toDate(item) {
    if (item === "ANi")
        return new Date(2000, 0);
    const tmp = item.split('-');
    // 经过字符串分割后, tmp[0]是年份, [1]是月份
    return new Date(parseInt(tmp[0]), parseInt(tmp[1])-1);
}

// 状态标志
// 参数(Proxy对象, 含有 loading 状态标识)
function startLoading(dataHandler) {
    dataHandler.loading = true;
}
function closeLoading(dataHandler) {
    dataHandler.loading = false;
}

// 加载根目录
// 参数(dataHandler  
//      mediaData: Proxy对象, 含有已打开目录的数组(name, parentPath, path, type)
//      apiConfig: Proxy对象含url: 'https://acg-api.hlz.ink:49999')
export function loadRootContent(dataHandler, mediaData, apiConfig) {
    startLoading(dataHandler);
    // console.log(dataHandler);
    // console.log(mediaData);
    // console.log(apiConfig);
    loadApi('/', apiConfig).then(response => response.json())   
        .then(data => mediaData.root = extractRootContent(data))    // 第一个then的结果会作为下一个then的参数
        .catch(error => { console.log(error); mediaData.root = [] })
        .finally(() => closeLoading(dataHandler));
}

// 加载视频
// 参数(config: Proxy对象, 含有视频目录的(name, parentPath, path, type)
//      dataHandler
//      mediaData: Proxy对象, 含有已打开目录的数组(name, parentPath, path, type), 和已打开视频目录的数组(name, url)
//      apiConfig)
export async function loadVideo(config, dataHandler, mediaData, apiConfig) {    // ??????????????????
    startLoading(dataHandler);
    // console.log(config);
    //  console.log(dataHandler);
    // console.log(mediaData);
    // console.log(apiConfig);
    const targetPath = config.type == 0 ? config.parentPath : config.path;
    await loadApi(targetPath, apiConfig).then(response => response.json())
        .then(async (data) => mediaData[config.path] = 
        await parseVideo(data, config, targetPath, apiConfig.url))
        .catch(error => { console.log(error); mediaData[config.path] = []; })
        .finally(() => closeLoading(dataHandler))
}

// 视频分析(视频路径)
// 参数(response: 一个视频的父目录的所有视频的数组(id, mimeType, modifiedTime, name, size)
//      config: Proxy对象, 含有视频目录的(name, parentPath, path, type)
//      targetPath: /2022-4/ 
//      apiUrl: https://acg-api.hlz.ink:49999
//      backup: loadVideo的所有参数)
// 返回已打开视频目录的数组(name, url)
async function parseVideo(response, config, targetPath, apiUrl) {
    let re = new RegExp("\\[(.+?)\\](.+?)\\[(.+?)\\]", "u");    //正则表达式匹配Unicode, 
    if(targetPath.includes("2022-4") || targetPath.includes("2022-7")) {
        // console.log(targetPath)
        re = new RegExp("\\[(.+?)\\](.+?)\\s+[-]\\s(\\d+)\\s\\[", "u");
    }

    // split按关键词分割字符串为数组, trim去除字符串的头尾空格
    const target = config.title.split("！")[0].split("!")[0].split("?")[0].split("？")[0].trim();
    let tmp = [];
    // let type = 0;
    response['files'].forEach(item => {
        // if (item['name'].includes('日文配音')) { type = 1; }
        // if (item['name'] === 'Baha') { type = 2; }
        if (item['name'].includes(target) && isVideo(item['mimeType'])) tmp.push(item['name']);
    })

    return tmp.map(item => {
        return {
            name: re.exec(item)[3],
            url: apiUrl + targetPath + item
        }
    }).sort((x, y) => x['name'].localeCompare(y['name']));
}

// 判断是否包含video类型
// 参数(mimeType: 包括 application/octet-stream, video/mp4)
// 返回是否包含video类型
function isVideo(mimeType) {
    return mimeType.includes('video');
}


// 加载目录
// 参数(dataHandler: 含有视频的targetPath, 如 targetPath: '/2022-4/'
//      mediaData: Proxy对象, 含有已打开目录的数组(name, parentPath, path, type), 和已打开视频目录的数组(name, url)
//      apiConfig)
export function loadContent(dataHandler, mediaData, apiConfig) {
    const targetPath = dataHandler.targetPath;  // /2022-7/
    startLoading(dataHandler);
    loadApi(targetPath, apiConfig).then(response => response.json())
        .then(data => mediaData[targetPath] = parseContent(data, targetPath))
        .catch(error => { console.log(error); mediaData[targetPath] = []; })
        .finally(() => closeLoading(dataHandler));
}

// 解析目录
// 参数(response: 一个视频的父目录的所有视频的数组(id, mimeType, modifiedTime, name, size)
//      targetPath: /2022-4/ )
// 返回targetPath目录下已完成整理分析的文件夹数组(name, parentPath, path, type)
function parseContent(response, targetPath) {
    let unOrdered = [];
    let Ordered = [];
    response['files'].forEach(item => {
        if (!item.mimeType.includes("folder"))  unOrdered.push(item["name"]);
        else if (!item.name.includes("合集"))   Ordered.push(item["name"]);
    })
    return parseUnorderedContent(unOrdered, targetPath).concat(parseOrderedContent(Ordered, targetPath))
        .sort((x, y) => x['name'].localeCompare(y['name']));
}

// 解析未整理目录
// 参数(data: 一个视频的父目录的所有视频的数组(只有 name 变量)
//      targetPath: /2022-4/ )
// 返回targetPath目录下已完成整理分析的文件夹数组(name, parentPath, path, type)
function parseUnorderedContent(data, targetPath) {
    // patch on 2022年8月18日
    let re = new RegExp("\\[(.+?)\\](.+?)\\[", "u");
    if(targetPath.includes("2022-4") || targetPath.includes("2022-7")) {
        // console.log(targetPath)
        re = new RegExp("\\[(.+?)\\](.+?)\\s+[-]\\s\\d+\\s\\[", "u");
    }
    data = data.map(item => {
        // console.log(item);   // item为目录中的name
        let res = re.exec(item)     // 去除目录内容中的[ANi], 并返回番剧名, 即res[2]
        // console.log(res); 
        if(res == null) return item
        else return res[2]
    })
    data = [...new Set(data)]   // ???????????????????
    return data.map(item => { return { name: item, type: 0, path: targetPath + item + '/', parentPath: targetPath } });
}

// 解析已整理目录
// 参数(data: 一个视频的父目录的所有视频的数组(只有 name 变量)
//      targetPath: /2022-4/ )
// 返回targetPath目录下已完成整理分析的文件夹数组(name, parentPath, path, type)
function parseOrderedContent(data, targetPath) {
    return data.map(item => {
        let name = item;
        if (name.includes("日文")) name = name.replace("/日文配音", '');
        return { name: name, type: 1, path: targetPath + item + '/', parentPath: targetPath }
    });
}
