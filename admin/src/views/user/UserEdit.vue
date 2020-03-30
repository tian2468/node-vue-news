<template>
  <div>
    <h2>{{$route.params.id?'修改':'添加'}}用户</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "UserEdit",
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      if (this.$route.params.id) {
        const res = await this.$http.put(
          `/users/${this.$route.params.id}`,
          this.model
        );
        this.$message({
          type: "success",
          message: "修改成功！"
        });
      } else {
        const res = await this.$http.post("/users", this.model);
        this.$message({
          type: "success",
          message: "创建成功！"
        });
      }
      this.$router.push("/user/list");
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$http.get(`/rest/users/${this.$route.params.id}`).then(res => {
        this.model = res.data;
      });
    }
  }
};
</script>

<style>
</style>