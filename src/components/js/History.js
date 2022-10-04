export function fillHistory(config, mediaData) {
    const path = config.path;
    mediaData[path].forEach(item => {
        item.history = timeFormat(getHistoryTime(config, item.name));
    });
}

function timeFormat(Time) {
    if (!Time || Time === 0) return "";
    const h = n2time(Math.floor((Time / 3600) % 24));
    const m = n2time(Math.floor((Time / 60) % 60));
    const s = n2time(Math.floor(Time % 60));
    let res = m + ':' + s;
    if (h > 0) res = h + ':' + res;
    return res;
}

function n2time(Time) {
    if (Time >= 10) return `${Time}`;
    else return `0${Time}`;
}

export function getHistory(config, mediaData) {
    const path = config.path;
    let res = localStorage.getItem("History-" + path);
    if (res && res !== 'undefined') return res;
    else return mediaData[path][0].name;
}

export function getHistoryTime(config, name) {
    const path = config.path;
    let res = localStorage.getItem("History-" + path + '-' + name);
    if (res && res !== 'undefined') return Number(res);
    else return 0;
}

export function updateHistory(config, name, currentTime) {
    if(currentTime < 15) return;
    const path = config.path;
    localStorage.setItem("History-" + path, name);
    localStorage.setItem("History-" + path + '-' + name, currentTime);
}

export function addHistoryRecord(config, name) {
    let records = localStorage.getItem("records");
    if (records && records !== 'undefined') records = JSON.parse(records)
    else records = []
    while(records.length >= 5000) records.shift();
    records.push({
        eps: name,
        config: config,
        date: new Date(),
    })
    localStorage.setItem("records", JSON.stringify(records))
}

export function getAllHistoryRecord() {
    let records = localStorage.getItem("records");
    if (records && records !== 'undefined') records = JSON.parse(records)
    else records = []
    records.forEach(item => {
        item.name = item.config.title + ' - ' + item.eps;
        item.date = new Date(item.date);
        item.time = item.date.toLocaleString();
    })
    return records.reverse();
}