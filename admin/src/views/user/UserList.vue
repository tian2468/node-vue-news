<template>
  <div>
    <h2>用户列表</h2>
    <el-table :data="UserData">
      <el-table-column prop="_id" label="id" align="center"></el-table-column>
      <el-table-column prop="username" label="用户名" align="center"></el-table-column>
      <el-table-column prop="password" label="密码" align="center"></el-table-column>
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
  name: "UserList",
  data() {
    return {
      UserData: []
    };
  },
  methods: {
    edit(id) {
      this.$router.push({
        name: `UserEdit`,
        params: {
          id
        }
      });
    },
    remove(row) {
      this.$confirm(`此操作将永久删除分类"${row.admin}", 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`/rest/users/${row._id}`).then(res => {
            this.$http.get("/rest/users").then(res => {
              this.UserData = res.data;
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
    this.$http.get("/rest/users").then(res => {
      this.UserData = res.data;
    });
  }
};
</script>

<style>
</style>