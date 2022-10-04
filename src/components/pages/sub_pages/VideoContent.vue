<!--
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-14 22:05:18
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-08-20 11:47:12
 * @FilePath: \my_acg_center\src\components\pages\sub_pages\VideoContent.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-row justify="center" v-loading="loading">
    <el-col :xs="24" :sm="11">
      <h1>{{ config.title }}</h1>

      <el-empty
        v-if="mediaData[targetPath] && mediaData[targetPath].length == 0"
        description="API 寄了, 点击重新加载"
        @click="reloadContent"
      ></el-empty>
      
      <el-table
        :data="
          this.mediaData[targetPath] &&
          this.mediaData[targetPath].filter(
            (item) =>
              !search || item.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        v-else
        stripe
        height="60vh"
        @row-click="openVdieo"
      >
        <div id="player" />
        <el-table-column prop="name" label="Name" align="center" >
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
import { inject } from "vue";
import { loadContent } from "@/components/js/MediaData";

export default {
  name: "VideoContent",
  props: ["config"],
  components: {},
  setup() {
    const mediaData = inject("mediaData");
    const apiConfig = inject("apiConfig");
    const Tab = inject("Tab");

    return {
      mediaData,
      apiConfig,
      Tab,
    };
  },
  data() {
    return {
      loading: true,
      search: "",
      targetPath: this.config.rootPath + this.config.path,
    };
  },
  mounted() {
    loadContent(this.$data, this.mediaData, this.apiConfig);
  },
  computed: {},
  methods: {
    reloadContent() {
      loadContent(this.$data, this.mediaData, this.apiConfig);
    },
    openVdieo(row) {
      this.Tab.openVideoPage({
        title: row.name,
        path: row.path,
        parentTitle: this.config.title,
        parentPath: row.parentPath,
        type: row.type,
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

