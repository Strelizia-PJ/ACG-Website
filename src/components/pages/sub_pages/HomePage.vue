<!--
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-14 22:03:48
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-08-20 11:36:27
 * @FilePath: \my_acg_center\src\components\pages\sub_pages\HomePage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-row justify="center" v-loading="loading">
    <el-col :xs="24" :sm="11">
      <h1>動畫廣場</h1>
      
      <!-- el-empty 判断表达式中对象或变量是否为空 -->
      <el-empty
        v-if="mediaData.root && mediaData.root.length == 0"
        description="API 寄了, 点击重新加载"
        @click="reloadRootContent"
      ></el-empty>

      <el-table
        :data="this.mediaData.root"
        stripe
        v-else
        height="60vh"
        @row-click="openContent"
      >
        <el-table-column
          prop="season"
          label="Season"
          align="center"
        ></el-table-column>
        
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { loadRootContent } from "@/components/js/MediaData";
import { inject } from "vue";

export default {
  name: "HomePage",
  props: ["config"],
  data() {
    return {
      loading: true,
    };
  },
  setup() {
    const mediaData = inject("mediaData");
    const Tab = inject("Tab");
    const apiConfig = inject("apiConfig");
    return {
      mediaData,
      Tab,
      apiConfig,
    };
  },
  mounted() {
    loadRootContent(this.$data, this.mediaData, this.apiConfig);
  },
  methods: {
    // reloadRootContent() {
    //   console.log("data");
    //   console.log(this.$data);
    //   console.log("this.mediaData");
    //   console.log(this.mediaData);
    //   console.log("this.apiConfig");
    //   console.log(this.apiConfig);
    //   loadRootContent(this.$data, this.mediaData, this.apiConfig);
    // },
    openContent(row) {
      this.Tab.openVideoContent({
        title: row["season"],
        path: row["path"],
        rootPath: "/",
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.6rem;
}
</style>