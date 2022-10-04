<template>
  <el-row justify="center" v-loading="loading">
    <el-col :xs="24" :sm="10">
      <h1>Settings</h1>
      <br class="hidden-sm-below" />
      <h2>Delete Data</h2>
      <p>点击下方按钮删除对应数据</p>
      <el-popconfirm
        title="Are you sure to delete all history?"
        icon-color="red"
        @confirm="historyEvent"
      >
        <template #reference>
          <el-button type="danger" round>History</el-button>
        </template>
      </el-popconfirm>
      <el-popconfirm
        title="Are you sure to delete all likes?"
        icon-color="red"
        @confirm="LikesEvent"
      >
        <template #reference>
          <el-button type="danger" round>Likes</el-button>
        </template>
      </el-popconfirm>
      <el-popconfirm
        title="Are you sure to delete all tabs?"
        icon-color="red"
        @confirm="TabsEvent"
      >
        <template #reference>
          <el-button type="danger" round>Tabs</el-button>
        </template>
      </el-popconfirm>
      <el-divider />
      <h2>Sync Data</h2>
      <p>设置Key后即可用于多客户的同步数据（一小时有效）</p>
      <el-form
        ref="numberValidateForm"
        :model="numberValidateForm"
        class="demo-ruleForm"
      >
        <el-form-item
          label="Key"
          prop="Key"
          :rules="[{ required: true, message: 'Key is required' }]"
        >
          <el-input v-model.number="dataKey" type="Key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-popconfirm
            title="确认上传？数据无密码保护，有效期一小时"
            icon-color="red"
            @confirm="uploadEvent"
          >
            <template #reference>
              <el-button type="primary" plain size="medium">Upload</el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
            title="确认恢复？可能覆盖本地数据"
            icon-color="red"
            @confirm="downloadEvent"
          >
            <template #reference>
              <el-button type="success" size="medium" plain>Recover</el-button>
            </template>
          </el-popconfirm>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { inject } from "vue";
import {
  cleanHistory,
  cleanTabs,
  cleanLikes,
  uploadData,
  downloadData,
} from "@/components/js/Setting.js";

export default {
  name: "SettingPage",
  data() {
    return {
      loading: false,
      dataKey: "",
    };
  },
  setup() {
    const apiConfig = inject("apiConfig");
    return {
      apiConfig,
    };
  },
  methods: {
    historyEvent() {
      cleanHistory();
    },
    TabsEvent() {
      cleanTabs();
    },
    LikesEvent() {
      cleanLikes();
    },
    uploadEvent() {
      uploadData(this.$data, this.apiConfig, this.dataKey);
    },
    downloadEvent() {
      downloadData(this.$data, this.apiConfig, this.dataKey);
    },
  },
};
</script>

<style>
@media only screen and (max-width: 820px) {
  .hidden-sm-below {
    display: none !important;
  }
}

</style>

<style scoped>
h1 {
  font-size: 2.6rem;
  margin: 1rem auto;
}

form {
    display: inline-block;
}
</style>