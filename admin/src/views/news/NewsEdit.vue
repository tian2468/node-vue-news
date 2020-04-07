<template>
  <div>
    <h2>{{$route.params.id?'编辑':'新建'}}新闻</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="model.introduce"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  name: "NewsEdit",
  data() {
    return {
      model: {
        categories: []
      },
      categories: []
    };
  },
  components: {
    VueEditor
  },
  methods: {
    async save() {
      if (this.$route.params.id) {
        const res = await this.$http.put(
          `/rest/news/${this.$route.params.id}`,
          this.model
        );
        this.$message({
          type: "success",
          message: "修改成功！"
        });
      } else {
        const res = await this.$http.post("/rest/news", this.model);
        this.$message({
          type: "success",
          message: "创建成功！"
        });
      }
      this.$router.push("/news/list");
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      let formData = new FormData();
      formData.append("upload", file);
      const res = await this.$http.post("/upload", formData);
      let url = res.data.url; 
      Editor.insertEmbed(cursorLocation, "image", url);
      resetUploader();
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$http.get(`/rest/news/${this.$route.params.id}`).then(res => {
        this.model = res.data;
      });
    }
    this.$http.get("/rest/categories").then(res => {
      this.categories = res.data;
    });
  }
};
</script>

<style>
</style>