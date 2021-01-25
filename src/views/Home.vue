<template>
  <div class="home">
    <el-row>
      <el-col class="home-col" :span="4">
        <span>域名：</span>
        <el-input v-model="domain" placeholder="xxx.com" width="22px"></el-input
      ></el-col>
      <el-col class="home-col" :span="4">
        <span> 端口：</span>
        <el-input v-model="ports" width="22px"></el-input
      ></el-col>
      <el-col class="home-col" :span="4">
        <span> 已运行：</span>
        <span>{{ count }}</span></el-col
      >
      <el-col class="home-col" :span="4"
        ><el-button :type="loading ? 'danger' : 'primary'" @click="submit">{{
          loading ? "中止" : "确定"
        }}</el-button></el-col
      >
    </el-row>
    <el-table
      border
      :data="tableData"
      :default-sort="{ prop: 'ports', order: 'descending' }"
      @row-click="clickData"
    >
      <el-table-column prop="domain" label="domain" width="350">
      </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column prop="ports" label="开放端口" width="300">
        <template slot-scope="scope">
          <span v-for="(item, index) in scope.row.ports" :key="index">
            {{ item }}
          </span>
        </template>
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
      ports: "80",
      count: 0,
      domain: "",
      loading: false,
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
        if (this.tableData.length) {
          for (let key of Object.keys(this.tableData)) {
            delete this.tableData[key];
          }
        }
        this.loading = true;
        main(this.domain, this.ports.split(","), (err, res) => {
          this.count++;
          if (res) {
            if (res.code) {
              this.tableData.push(res);
            } else {
              this.loading = false;
              this.$message({
                message: "结束",
                type: "success"
              });
            }
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

<style lang="scss">
.home {
  padding: 20px 5%;
  .el-row {
    display: flex;
    justify-content: space-between;
  }
  .home-col {
    display: flex;
    align-items: center;
    flex: 1;
    &:last-child {
      margin-left: 20px;
    }
    &:nth-last-child(2) {
      margin-left: 20px;
    }
    span {
      display: inline-block;
      width: 100px;
    }
  }
  .el-table {
    margin: 20px 15px;
  }
  .el-table td,
  .el-table th {
    padding: 5px 0 !important;
  }
}
</style>
