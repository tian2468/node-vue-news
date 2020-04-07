<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="ImageData">
      <el-table-column prop="_id" label="id" align="center"></el-table-column>
      <el-table-column prop="title" label="图片名称" width="120" align="center"></el-table-column>
      <el-table-column label="上传时间" align="center">
        <template v-slot="scope">
          <span>{{date(scope.row.date)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容" align="center">
        <template v-slot="scope">
          <el-image
            style="width: 200px; height: 100px"
            :src="scope.row.imageUrl"
            :preview-src-list="[scope.row.imageUrl]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" align="center">
        <template v-slot="scope">
          <el-link :underline="false" type="success" v-if="scope.row.hidden">是</el-link>
          <el-link :underline="false" type="warning" v-else>否</el-link>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template v-slot="scope">
          <el-button type="primary" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "BannerList",
  data() {
    return {
      ImageData: []
    };
  },
  computed: {
    date() {
      return val => {
        const dates = new Date(val);
        const yy = dates.getFullYear();
        const mm =
          dates.getMonth() + 1 < 10
            ? `0${dates.getMonth() + 1}`
            : dates.getMonth() + 1;
        const dd =
          dates.getDate() < 10 ? `0${dates.getDate()}` : dates.getDate();
        const hh =
          dates.getHours() < 10 ? `0${dates.getHours()}` : dates.getHours();
        const min =
          dates.getMinutes() < 10
            ? `0${dates.getMinutes()}`
            : dates.getMinutes();
        const ss =
          dates.getSeconds() < 10
            ? `0${dates.getSeconds()}`
            : dates.getSeconds();
        return `${yy}-${mm}-${dd} ${hh}:${min}:${ss}`;
      };
    }
  },
  methods: {
    edit(id) {
      this.$router.push({
        name: `BannerEdit`,
        params: {
          id
        }
      });
    },
    remove(row) {
      this.$confirm(`此操作将永久删除图片"${row.name}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/rest/banners/${row._id}`).then(res => {
            this.$http.get("/rest/banners").then(res => {
              this.ImageData = res.data;
            });
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.$http.get("/rest/banners").then(res => {
      this.ImageData = res.data;
    });
  }
};
</script>

<style>
</style>