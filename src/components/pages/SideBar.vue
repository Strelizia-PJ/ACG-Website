<!--
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-05 19:44:46
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-08-23 11:49:29
 * @FilePath: \project_acg\src\components\pages\SideBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-menu
    id="side-bar"
    default-active="1"
    class="el-menu-vertical-demo"
    :collapse="isSideBarCollapse"
  >
    <el-menu-item index="1" @click="Home">
      <el-icon><Icon-menu /></el-icon>
      <template #title>Home</template>
    </el-menu-item>

    <el-menu-item index="2" @click="Likes">
      <el-icon><Star /></el-icon>
      <template #title>Likes</template>
    </el-menu-item>
    <el-menu-item index="3" @click="History">
      <el-icon><Management /></el-icon>
      <template #title>History</template>
    </el-menu-item>
    <el-menu-item index="4" @click="Setting">
      <el-icon><Setting /></el-icon>
      <template #title>Settings</template>
    </el-menu-item>
    <el-menu-item index="5" @click="Contribution">
      <el-icon><CoffeeCup /></el-icon>
      <template #title>About</template>
    </el-menu-item>
    
  </el-menu>
</template>
<script>
import {
  Menu as IconMenu,
  Management,
  Setting,
  Star,
  CoffeeCup,
} from "@element-plus/icons-vue";

import { inject } from "vue";

export default {
  name: "SideBar",
  components: {
    IconMenu,
    Setting,
    Star,
    Management,
    CoffeeCup,
  },
  setup() {
    const isSideBarCollapse = inject("isSideBarCollapse");
    const Tab = inject("Tab");
    return {
      isSideBarCollapse,
      Tab,
    };
  },
  methods: {
    Home() {
      this.Tab.addHomePage();
    },
    Hello() {
      this.Tab.addHelloPage();
    },
    Contribution() {
      this.Tab.addContributionPage();
    },
    Likes() {
      this.Tab.addLikesPage();
    },
    History() {
      this.Tab.addHistoryPage();
    },
    Setting() {
      this.Tab.addSettingPage();
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 10.5rem;
}

.el-menu--collapse {
  min-width: 3.5rem;
  width: 3.5rem;
}

.el-menu-item {
  border: none !important;
}
</style>
