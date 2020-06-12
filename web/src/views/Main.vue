<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30px" />
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey fs-xxs ">团队成就更多</div>
      </div>

      <button type="button" class="btn bg-primary">立即下载</button>
    </div>

    <div class="top-nav bg-primary pt-3 pb-2">
      <div class="nav d-flex text-white jc-around pb-1">
        <div class="nav-item active">
          <router-link tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.top-nav {
  .nav {
    .nav-item {
      // 即使透明也要加边框，防止不对齐
      border-bottom: 3px solid transparent;
      padding-bottom: 0.2rem;
      &.active {
        border-bottom: 3px solid white;
      }
    }
  }
}
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
