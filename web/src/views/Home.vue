<template>
  <div>
    <form action="/">
      <van-search readonly placeholder="请输入搜索关键词" />
    </form>
    <van-swipe :autoplay="3000" height="200" :duration="1000" :show-indicators="false">
      <van-swipe-item v-for="(item, index) in images" :key="index">
        <img style="width:100%;height:100%;" :src="item.imageUrl" />
        <p v-if="item.introduce !=''" class="introduce">{{item.introduce}}</p>
      </van-swipe-item>
    </van-swipe>
    <div class="news_list">
      <div class="news_item" v-for="(item,_id) in news" :key="_id" @click="detail(item._id)">
        <p class="title">{{item.title}}</p>
        <p class="int">{{item.introduce}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      news: []
    };
  },
  created() {
    this.$http.get("/rest/banner").then(res => {
      this.images = res.data;
    });
    this.$http.get("/rest/categories").then(res => {
      this.$http.get("/rest/news").then(res => {
        this.news = res.data;
      });
    });
  },
  methods: {
    detail(id) {
      console.log(id);
      this.$router.push({
        name: "Detail",
        params: { id }
      });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/style/fontSize.scss";
.introduce {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px;
  font-size: 16px;
}
.news_list {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .news_item {
    padding: 10px;
    border-bottom: 1px solid #666;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .introduce {
      font-size: 14px;
      color: #ccc !important;
    }
  }
}
</style>