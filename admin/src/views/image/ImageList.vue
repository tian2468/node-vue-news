<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="ImageData">
      <el-table-column prop="_id" label="id" align="center"></el-table-column>
      <el-table-column prop="name" label="图片名称" width="120" align="center"></el-table-column>
      <el-table-column prop="content" label="内容" align="center">
        <template v-slot="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.imageUrl"
            :preview-src-list="[scope.row.imageUrl]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="__v" label="修改次数" align="center"></el-table-column>
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
  name: "ImageList",
  data() {
    return {
      ImageData: []
    };
  },
  methods: {
    edit(id) {
      this.$router.push({
        name: `ImageUpload`,
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
          this.$http.delete(`/rest/images/${row._id}`).then(res => {
            this.$http.get("/rest/images").then(res => {
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
    this.$http.get("/rest/images").then(res => {
      this.ImageData = res.data;
    });
  }
};
</script>

<style>
</style>