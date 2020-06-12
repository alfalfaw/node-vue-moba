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
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center  pt-3 text-grey">
      <div class="d-flex flex-wrap ">
        <!-- 注意不要同时设置元素上下的边距，应该设置元素一方边距配合父元素的的内边距,否则中间会出现边距叠加 -->
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"> </i>
          <div class="py-2">爆料站</div>
        </div>
      </div>

      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
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
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

// sprite
.sprite {
  background: url(https://game.gtimg.cn/images/yxzj/m/m201706/images/bg/index.png) no-repeat 0 0;
  background-size: 28.8462rem;
  display: inline-block;
  &.sprite-news {
    background-position: 9.302% 0.813%;
    width: 2.3846rem;
    height: 1.9231rem;
  }
  &.sprite-arrow {
    background-position: 38.577% 52.076%;
    width: 0.7692rem;
    height: 0.7692rem;
  }
}
</style>
