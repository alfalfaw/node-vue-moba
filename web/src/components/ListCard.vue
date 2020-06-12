<template>
  <m-card :title="title" :icon="icon">
    <div class="d-flex nav jc-between my-1">
      <div
        class="nav-item"
        :class="{ active: active === index }"
        v-for="(category, index) in categories"
        :key="index"
        @click="$refs.list.$swiper.slideTo(index)"
      >
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <div>
      <swiper ref="list" @slide-change="() => (active = $refs.list.$swiper.realIndex)">
        <swiper-slide v-for="(category, index) in categories" :key="index">
          <!-- 具名插槽 -->
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';

.card-body {
  .nav {
    .nav-item {
      // 即使透明也要加边框，防止不对齐
      border-bottom: 3px solid transparent;
      padding-bottom: 0.2rem;
      &.active {
        color: map-get($colors, 'primary');
        border-bottom: 3px solid map-get($colors, 'primary');
      }
    }
  }
}
</style>
