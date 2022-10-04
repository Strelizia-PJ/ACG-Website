/*
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-14 21:22:06
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-10-04 22:04:58
 * @FilePath: \my_acg_center\src\components\js\Tab.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { shallowRef } from 'vue';

import HomePage from '@/components/pages/sub_pages/HomePage';
import VideoContent from '@/components/pages/sub_pages/VideoContent';
import VideoPage from '@/components/pages/sub_pages/VideoPage';
import LikesPage from '@/components/pages/sub_pages/LikesPage';
import ContributionPage from '@/components/pages/sub_pages/ContributionPage';
import SettingPage from '@/components/pages/sub_pages/SettingPage';
import HistoryPage from '@/components/pages/sub_pages/HistoryPage';

export function loadTab() {
    if (localStorage.getItem("Tab") !== 'undefined') {
        // JSON.parse 把数据转为js对象
        const res = JSON.parse(localStorage.getItem("Tab"))
        if (res) return res;
        else return [];
    }
    else return [];
}

export function saveTab(Tab) {
    // JSON.stringify 把js对象转化为字符串
    localStorage.setItem("Tab", JSON.stringify(Tab.tabList));
}

export function initTab(Tab) {

    Tab.addPage = function (tabData) {
        if (Tab.tabSet.has(tabData.id)) {
            Tab.activeTab = tabData.id;
            return;
        }
        
        Tab.tabIndex++;
        Tab.tabList.push(tabData);
        Tab.tabSet.add(tabData.id);
        Tab.activeTab = tabData.id;
        saveTab(Tab)
    };

    Tab.removePage = function (tabId) {
        // console.log("removePage:");
        console.log(tabId);
        // console.log(Tab);
        // console.log("----------------");
        
        const tabs = Tab.tabList;
        let activeId = Tab.activeTab;
        if (activeId === tabId) {
            tabs.forEach((tab, index) => {
                if (tab.id === tabId) {
                    const nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeId = nextTab.id;
                    }
                }
            });
        }
        Tab.activeTab = activeId;
        Tab.tabList = tabs.filter((tab) => tab.id !== tabId);
        Tab.tabSet.delete(tabId);
        saveTab(Tab)
    };

    Tab.removeAllPage = function (tabId) {
        const tabs = Tab.tabList;
        let activeId = Tab.activeTab;
        if (activeId === tabId) {
            tabs.forEach((tab, index) => {
                if (tab.id === tabId) {
                    const nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        activeId = nextTab.id;
                    }
                }
            });
        }
        Tab.activeTab = activeId;
        Tab.tabList = tabs.filter((tab) => tab.id !== tabId);
        Tab.tabSet.delete(tabId);
        saveTab(Tab)
    };

    Tab.addHomePage = function () {
        // console.log(Tab);
        Tab.addPage({
            title: "Home",
            id: "Home",
            component: shallowRef(HomePage),
            config: {},
        });
    };

    Tab.openVideoContent = function (config) {
        // console.log("config");
        // console.log(config);
        Tab.addPage({
            title: config.title,
            id: config.title,
            component: shallowRef(VideoContent),
            config: config
        })
    }

    Tab.openVideoPage = function (config) {
        Tab.addPage({
            title: config.title,
            id: config.path,
            component: shallowRef(VideoPage),
            config: config
        })
    }

    Tab.addHistoryPage = function () {
        Tab.addPage({
            title: "History",
            id: "History",
            component: shallowRef(HistoryPage),
            config: {},
        });
    }

    Tab.addContributionPage = function () {
        Tab.addPage({
            title: "Contribution",
            id: "Contribution",
            component: shallowRef(ContributionPage),
            config: {},
        });
    };

    Tab.addLikesPage = function () {
        Tab.addPage({
            title: "Likes",
            id: "Likes",
            component: shallowRef(LikesPage),
            config: {},
        });
    }

    Tab.addSettingPage = function () {
        Tab.addPage({
            title: "Setting",
            id: "Setting",
            component: shallowRef(SettingPage),
            config: {},
        });
    }
    
    const tmpTabList = loadTab();
    if (tmpTabList.length == 0) {
        Tab.addHomePage();
    } else {
        tmpTabList.forEach(tabItem => {
            let pageType = tabItem.component.name;
            if (pageType === "HomePage") Tab.addHomePage();
            if (pageType === "VideoContent") Tab.openVideoContent(tabItem.config);
            if (pageType === "VideoPage") Tab.openVideoPage(tabItem.config);
            if (pageType === "ContributionPage") Tab.addContributionPage();
            if (pageType === "HistoryPage") Tab.addHistoryPage();
            if (pageType === "LikesPage") Tab.addLikesPage();
        })
    }
}
