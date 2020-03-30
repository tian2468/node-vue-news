<template>
  <div>
    <h2>{{$route.params.id?'修改':'上传'}}图片</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action="11"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="beforeAvatarUpload"
        >
          <img v-if="model.imageUrl" :src="model.imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "ImageUpload",
  data() {
    return {
      model: {
        imageUrl: ""
      }
    };
  },
  methods: {
    async save() {
      if (this.$route.params.id) {
        const res = await this.$http.put(
          `/rest/images/${this.$route.params.id}`,
          this.model
        );
        this.$message({
          type: "success",
          message: "修改成功！"
        });
      } else {
        const res = await this.$http.post("/rest/images", this.model);
        this.$message({
          type: "success",
          message: "创建成功！"
        });
      }
      this.$router.push("/image/list");
    },
    async beforeAvatarUpload(file, fileList) {
      const formData = new FormData();
      formData.append("upload", file.raw);
      const res = await this.$http.post("/upload", formData);
      this.$set(this.model, "imageUrl", res.data.url);
    }
  },
  created() {
    if (this.$route.params.id) {
      this.$http.get(`/rest/images/${this.$route.params.id}`).then(res => {
        this.model = res.data;
      });
    }
  }
};
</script>

<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>