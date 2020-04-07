<template>
  <div class="wrap">
    <p class="title">{{detail.title}}</p>
    <div class="categories">
      <van-tag v-for="(item,_id) in detail.categories" :key="_id" plain type="warning">{{item.name}}</van-tag>
    </div>
    <div class="content" v-html="detail.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {}
    };
  },
  created() {
    console.log(this.$route);
    this.$http.get(`/rest/news/${this.$route.params.id}`).then(res => {
      console.log(res);
      this.detail = res.data;
    });
  }
};
</script>
<style lang="scss">
@import "../assets/style/fontSize.scss";
.wrap {
  display: flex;
  flex-direction: column;
  padding: 10px;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .content{
    font-size: 16px;
    line-height: 25px;
    margin-top: 15px;
    text-indent: 2em;
  }
  padding-bottom: 100px;
}
</style>