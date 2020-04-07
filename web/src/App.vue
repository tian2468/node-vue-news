<template>
  <div id="app">
    <router-view />
    <van-tabbar route v-model="active" safe-area-inset-bottom>
      <van-tabbar-item replace name="Home" to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item replace name="User" to="/user" icon="manager-o">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  created() {
    const html = document.getElementsByTagName("html")[0];
    const htmlWidth = html.clientWidth || document.body.clientWidth;
    html.style.fontSize = `${htmlWidth / 32.5}px`;
  }
};
</script>
<style lang="scss">
@import "./assets/style/fontSize.scss";
.tabBar {
  font-size: px2rem(70) !important;
}
</style>
