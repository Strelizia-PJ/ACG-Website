<!--
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-14 20:59:31
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-08-20 11:33:07
 * @FilePath: \my_acg_center\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-container>

    <el-header>
    <HeadBar></HeadBar>
    </el-header>

    <el-container>
      <SideBar></SideBar>    
      <el-main> 
        <MainPage></MainPage>
      </el-main>
    </el-container>
    
  </el-container>
</template>

<script>

import { init } from '@/components/js/Init.js';
import MainPage from '@/components/pages/MainPage.vue';
import SideBar from '@/components/pages/SideBar.vue';
import HeadBar from '@/components/pages/HeadBar.vue';

export default {
  name: 'App',
  components: {
    MainPage, 
    SideBar,
    HeadBar,
    
},
  data() {
    return {};
  },
  setup() {
    return init();
  },
  beforeCreate() {},
  created() {}
}
</script>


<style>
body {
  margin: 0;
  touch-action: manipulation;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(0, 0, 0);
}

html,
body,
#app,
.el-container {
  height: 100%;
  overflow: hidden;
}
.el-main {
  height: 100%;
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.el-header {
  --el-header-padding: 0 0px;
  padding: 0;
}

.el-main {
  padding: 0;
}
</style>
