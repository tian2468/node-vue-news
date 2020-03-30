<template>
  <div>
    <h2>分类列表</h2>
    <el-table :data="NewsData">
      <el-table-column prop="_id" label="id" align="center"></el-table-column>
      <el-table-column label="所属分类" align="center">
        <template v-slot="scope">
          <el-tag v-for="tag in scope.row.categories" :key="tag._id">{{tag.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="120" align="center"></el-table-column>
      <el-table-column prop="introduce" label="简介" align="center"></el-table-column>
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
  name: "CategoryList",
  data() {
    return {
      NewsData: []
    };
  },
  methods: {
    edit(id) {
      this.$router.push({
        name: `NewsEdit`,
        params: {
          id
        }
      });
    },
    remove(row) {
      this.$confirm(`此操作将永久删除文章"${row.title}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/rest/news/${row._id}`).then(res => {
            this.$http.get("/rest/news").then(res => {
              this.NewsData = res.data;
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
    this.$http.get("/rest/news").then(res => {
      this.NewsData = res.data;
    });
  }
};
</script>

<style>
</style>