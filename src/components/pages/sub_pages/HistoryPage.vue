<template>
  <el-row justify="center">
    <el-col :xs="24" :sm="10">
      <h1>History</h1>

      <el-input
        class="hidden-sm-below searchBox"
        v-model="search"
        size="mini"
        placeholder="Type to search"
      />
      <el-table
        :data="
          records.filter(
            (item) =>
              !search ||
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.time.toLowerCase().includes(search.toLowerCase())
          )
        "
        stripe
        height="60vh"
        @cell-click="clickHandler"
        class="hidden-sm-below"
      >
        <el-table-column
          prop="name"
          label="Name (Click to Jump)"
          align="center"
        ></el-table-column>
        <el-table-column prop="time" label="Date" align="center">
          <template #header>
            <el-button size="small" plain @click="refresh">Reload</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-input
        class="hidden-sm-up searchBox"
        v-model="search"
        size="mini"
        placeholder="Type to search"
      />
      <el-table
        :data="
          records.filter(
            (item) =>
              !search ||
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.time.toLowerCase().includes(search.toLowerCase())
          )
        "
        stripe
        height="60vh"
        @cell-click="clickHandler"
        class="hidden-sm-up"
      >
        <el-table-column
          prop="name"
          label="Name (Click to Jump)"
          align="center"
          width="170"
        ></el-table-column>
        <el-table-column prop="time" label="Date" align="center">
          <template #header>
            <el-button size="small" plain @click="refresh">Reload</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import { getAllHistoryRecord } from "@/components/js/History.js";
import { inject } from "vue";

export default {
  name: "HistoryPage",
  props: ["config"],
  data() {
    return {
      records: [],
      search: "",
    };
  },
  setup() {
    const Tab = inject("Tab");
    return {
      Tab,
    };
  },
  mounted() {
    this.records = getAllHistoryRecord();
  },
  methods: {
    refresh() {
      this.records = getAllHistoryRecord();
    },
    openVideo(row) {
      this.Tab.openVideoPage(row.config);
    },
    clickHandler(row, column) {
      if (column.label === "Name (Click to Jump)") this.openVideo(row);
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
@media only screen and (min-width: 820px) {
  .hidden-sm-up {
    display: none !important;
  }
}
</style>

<style scoped>
h1 {
  font-size: 2.6rem;
}

.searchBox {
  padding: 0 10px;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  line-height: 23px;
}
</style>