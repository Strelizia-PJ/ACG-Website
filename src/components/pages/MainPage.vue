<!--
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-14 21:10:28
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-08-20 11:34:22
 * @FilePath: \my_acg_center\src\components\pages\MainPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-tabs
    v-model="this.Tab.activeTab"
    type="card"
    closable
    @tab-remove="this.Tab.removePage"
  >
    <el-tab-pane
      v-for="item in this.Tab.tabList"
      :key="item.id"
      :label="item.title"
      :name="item.id"
    >
    
      <keep-alive>
        <component :is="item.component" :config="item.config" />
      </keep-alive>

    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { inject } from "vue";
import { initTab } from "@/components/js/Tab.js";

export default {
    name: "MainPage",
    component: {},
    methods: {},
    setup() {
        const Tab = inject("Tab");

        return {
            Tab,
        };
    },
    mounted() {
        initTab(this.Tab);
    },
};
</script>

<style>
.el-main {
  overflow: hidden;
} 
</style>

<style scoped>

.el-tab-pane {
  overflow: auto;
}

.el-tabs,
.el-tab-pane {
  height: 100%;
  border: none;
}

.el-tabs--border-card {
  box-shadow: none !important;
  border: none !important;
}
</style>