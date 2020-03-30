<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <p style="text-align:center;">登录</p>
    </div>
    <el-form @submit.native.prevent="login">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-button type="primary" native-type="submit" style="margin:0 auto;display:block;">登录</el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    login() {
      this.$http.post("/login", this.model).then(res => {
        localStorage.token = res.data.token;
        this.$router.push("/");
        this.$message({
          type: "success",
          message: "登录成功！"
        });
      });
    }
  }
};
</script>

<style>
.box-card {
  width: 480px;
  margin: 10% auto;
}
</style>