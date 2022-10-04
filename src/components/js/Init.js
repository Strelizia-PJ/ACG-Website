/*
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-14 21:07:25
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-10-01 21:26:21
 * @FilePath: \my_acg_center\src\components\js\Init.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ref, provide, reactive } from 'vue';
import { initLikes } from "@/components/js/Likes.js"


export function init() {
    const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const isSideBarCollapse = width < 750 ? ref(true) : ref(false);
    provide("isSideBarCollapse", isSideBarCollapse);

    const Tab = reactive({
        activeTab: "",
        tabIndex: 0,
        tabSet: new Set(),
        tabList: [],
    });
    provide("Tab", Tab);

    const mediaData = reactive({});
    provide("mediaData", mediaData);

    const apiConfig = reactive({
        url: process.env.VUE_APP_API_URL
    });
    provide("apiConfig", apiConfig);

    const Likes = initLikes();
    provide("Likes", reactive(Likes));
}