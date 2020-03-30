<template>
  <div>
    <h2>{{$route.params.id?'编辑':'新建'}}分类</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :value="item._id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategoryEdit",
  data() {
    return {
      model: {},
      parents: []
    };
  },
  methods: {
    async save() {
      if (this.$route.params.id) {
        const res = await this.$http.put(
          `/rest/categories/${this.$route.params.id}`,
          this.model
        );
        this.$message({
          type: "success",
          message: "修改成功！"
        });
      } else {
        const res = await this.$http.post("/rest/categories", this.model);
        this.$message({
          type: "success",
          message: "创建成功！"
        });
      }
      this.$router.push("/categories/list");
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$http.get(`/rest/categories/${this.$route.params.id}`).then(res => {
        this.model = res.data;
      });
    }
    this.$http.get("/rest/categories").then(res => {
      this.parents = res.data;
    });
  }
};
</script>

<style>
</style>