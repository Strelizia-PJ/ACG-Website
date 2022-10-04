<!--
 * @Author: Strelizia-PJ 2953266817@qq.com
 * @Date: 2022-08-23 11:36:00
 * @LastEditors: Strelizia-PJ 2953266817@qq.com
 * @LastEditTime: 2022-10-04 17:56:58
 * @FilePath: \my_acg_center\src\components\pages\sub_pages\ContributionPage.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-row justify="center">
    <el-col :xs="22" :sm="10">
      <h1>About</h1>
      <h2>简介</h2>
      这是一个基于ANi-Open实现的ACG网站。网站核心纯前端实现，边爬边用，所有数据仅留本地，0隐私风险。
      <el-divider />
      <h2>特别感谢</h2>
      <img src="../../../../public/hlz.jpg" >
      <ul>
        <li><p>技术支持以及技术指导</p></li>
        <li><p>国内API代理</p></li>
      </ul>
      <el-divider>
        <el-icon><StarFilled /></el-icon>
      </el-divider>
      <h2>ANi</h2>
      <ul>
        <li><p>视频API ( 版权问题请找他x )</p></li>
        <li>
          <p>
            <a href="https://t.me/channel_ani" target="_blank">TG Channel</a>,
            <a href="https://ko-fi.com/anidonate" target="_blank">快速捐钱</a>
          </p>
        </li>
      </ul>
      <el-divider>
        <el-icon><StarFilled /></el-icon>
      </el-divider>
      <br />
    </el-col>
  </el-row>
</template>

<script>
import { StarFilled } from "@element-plus/icons-vue";

export default {
  name: "ContributionPage",
  props: ["config"],
  components: {
    StarFilled,
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 5rem;
}

a {
  color: #06285c !important;
}

h1 {
  font-size: 2.6rem;
}

h2 {
  text-align: left;
  font-size: 1.7rem;
}

p {
  font-size: 0.9rem;
  text-align: left;
}
</style>>