<template>
  <div class="home">
    <el-row>
      <el-col :span="4"
        ><el-input
          v-model="domain"
          placeholder="secpulse.com"
          width="22px"
        ></el-input
      ></el-col>
      <el-col :span="4"
        ><el-button :type="loading ? 'danger' : 'primary'" @click="submit">{{
          loading ? "中止" : "确定"
        }}</el-button></el-col
      >
      <el-col :span="4"
        ><el-input v-model="result" width="22px"></el-input
      ></el-col>
    </el-row>
    <el-table :data="tableData" @row-click="clickData" style="width: 100%">
      <el-table-column prop="domain" label="域名" width="180">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { ipcRenderer } from "electron";
import { main } from "../server";
import { clipboard } from "electron";

export default {
  name: "Home",
  data() {
    return {
      domain: "baidu.com",
      loading: false,
      result: "",
      tableData: []
    };
  },
  created() {
    // ipcRenderer.on("domain", (event, arg) => {
    //   this.tableData.push(arg);
    // });
  },
  methods: {
    submit() {
      if (this.loading) {
        location.reload();
      } else {
        this.loading = true;
        main(this.domain, (err, res) => {
          if (res) {
            this.tableData.push(res);
          }
        });
      }
      // ipcRenderer.send("submit", this.domain);
    },
    clickData(row) {
      if (row.domain) {
        clipboard.writeText(row.domain);
        this.$message({
          message: "域名复制成功",
          type: "success"
        });
      }
    }
  }
};
</script>
