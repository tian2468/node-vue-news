<template>
  <div>
    <h2>{{$route.params.id?'编辑':'新建'}}banner</h2>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="model.introduce"></el-input>
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
      <el-form-item label="是否显示">
        <el-radio v-model="model.hidden" :label="true">是</el-radio>
        <el-radio v-model="model.hidden" :label="false">否</el-radio>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "NewsEdit",
  data() {
    return {
      model: {
        date: new Date()
      }
    };
  },
  methods: {
    async save() {
      if (this.$route.params.id) {
        const res = await this.$http.put(
          `/rest/banner/${this.$route.params.id}`,
          this.model
        );
        this.$message({
          type: "success",
          message: "修改成功！"
        });
      } else {
        const res = await this.$http.post("/rest/banner", this.model);
        this.$message({
          type: "success",
          message: "创建成功！"
        });
      }
      this.$router.push("/banner/list");
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
      this.$http.get(`/rest/banner/${this.$route.params.id}`).then(res => {
        this.model = res.data;
      });
    }
  }
};
</script>

<style>
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
  width: 300px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}
</style>