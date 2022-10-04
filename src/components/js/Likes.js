export function initLikes() {
    if (localStorage.getItem("Likes") !== 'undefined') {
        const res = JSON.parse(localStorage.getItem("Likes"))
        if (res) return res;
        else return {};
    }
    else return {};
}

export function saveLikes(Likes) {
    localStorage.setItem("Likes", JSON.stringify(Likes));
}

export function changeStatus(Likes, config) {
    if (Likes[config.path])
        delete Likes[config.path]
    else
        Likes[config.path] = config;
    saveLikes(Likes);
}

export function removeLikes(Likes, config) {
    delete Likes[config.path];
    saveLikes(Likes);
}

export function isLiked(Likes, config) {
    return Likes[config.path] ? true : false;
}

export function clearLikes(Likes) {
    Likes.clear();
    saveLikes(new Map());
}
