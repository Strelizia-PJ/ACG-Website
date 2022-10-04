<!--
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-01 10:25:20
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-10-04 22:24:41
 * @FilePath: \ACG-Centre-main\src\components\HeadBar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-header>
    <el-row id="head-bar" justify="space-between">
      <el-col :span="22" class="title"
        ><span :style="`font-size: 20px`">Misaka Mikoto</span></el-col
      >
      <el-col :span="1" offset="1">
        <li class="el-menu-item" @click="cloesAllPages">
          <el-icon><Remove class="title-icon" /></el-icon>
        </li>
    </el-col>
      <el-col :span="1">
          <li class="el-menu-item" @click="changeCollapse">
            <el-icon><Fold class="title-icon" /></el-icon>
          </li>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { Fold,Remove } from "@element-plus/icons-vue";
import { inject } from "vue";

export default {
  name: "HeadBar",
  components: {
    Fold,
    Remove,
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
    changeCollapse() {
      this.isSideBarCollapse = this.isSideBarCollapse ? false : true;
    },
    cloesAllPages(){
      localStorage.removeItem("Tab");
      window.location.reload();
    }
  },
};
</script>

<style scoped>
#head-bar {
  background-color: #fc8bab;
  color: #fff;
  --el-menu-hover-bg-color: rgb(202, 111, 137);
  border-bottom: solid 1px var(--el-menu-border-color);
  height: 60px;
  line-height: 60px;
  vertical-align: middle;
}

.title {
  text-align: left;
  padding-left: 2em;
}

.title-icon-list {
  flex-direction: row-reverse;
  background-color: #fc8bab;
  color: #fff;
  --el-menu-hover-bg-color: rgb(202, 111, 137);
}

.title-icon {
  color: white;
  scale: 1.2;
}
</style>