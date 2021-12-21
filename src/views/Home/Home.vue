<template>
  <div class="home">
    <Header></Header>
    <div class="home-main-box">
      <Aside></Aside>
      <!-- 右侧内容主体区域 -->
      <div class="home-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Aside from "@/components/Aside/Aside";
export default {
  components: {
    Header,
    Aside,
  },
};
</script>

<style>
.home-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.home-main-box {
  height: 100%;
  display: flex;
}

.home-main-body {
  padding: 15px;
  flex: 1;
}
</style>