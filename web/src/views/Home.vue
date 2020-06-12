<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="https://ossweb-img.qq.com/upload/adw/image/20200612/b3d9f3b40ea5f3136adb87e05faaae63.png" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="https://ossweb-img.qq.com/upload/adw/image/20200612/b3d9f3b40ea5f3136adb87e05faaae63.png" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="https://ossweb-img.qq.com/upload/adw/image/20200612/b3d9f3b40ea5f3136adb87e05faaae63.png" alt="" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home'
        }
        // Some Swiper option/callback...
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/variables';
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, 'white');
    &.swiper-pagination-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}
</style>
