<template>
  <div>
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="https://ossweb-img.qq.com/upload/adw/image/20200612/b3d9f3b40ea5f3136adb87e05faaae63.png" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="https://ossweb-img.qq.com/upload/adw/image/20200613/bab185cd0bfe9beef6f1f44f6e59114f.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="https://ossweb-img.qq.com/upload/adw/image/20200616/5c787a554dfa7a5aff0d6f5aacf0d953.jpeg" alt="" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 text-center  pt-3 text-grey">
      <div class="d-flex flex-wrap ">
        <!-- 注意不要同时设置元素上下的边距，应该设置元素一方边距配合父元素的的内边距,否则中间会出现边距叠加 -->
        <div class="nav-item mb-3" v-for="entry in entries" :key="entry.name">
          <i class="sprite" :class="'sprite-' + entry.icon"></i>
          <div class="py-2">{{ entry.name }}</div>
        </div>
      </div>

      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i v-if="isShowAll" class="sprite sprite-arrow-up mr-1"></i>
        <i v-else class="sprite sprite-arrow-down mr-1"></i>
        <span @click="isShowAll = !isShowAll">{{ isShowAll ? '收起' : '展开' }}</span>
      </div>
    </div>

    <m-list-card title="新闻资讯" icon="news" :categories="newsCats">
      <!-- 取插槽中的值用 # -->
      <template #items="{ category }">
        <router-link
          :to="`/articles/${news._id}`"
          tag="div"
          class="py-2 fs-lg d-flex"
          v-for="(news, index) in category.newsList"
          :key="index"
        >
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{ news.title }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card title="英雄列表" icon="card-hero" :categories="heroCats">
      <!-- 取插槽中的值用 # -->
      <template #items="{ category }">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/heros/${hero._id}`"
            class="p-2 text-center"
            style="width:20%;"
            v-for="(hero, index) in category.heroList"
            :key="index"
          >
            <img class="w-100" :src="hero.avater" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  computed: {
    entries() {
      if (this.isShowAll) {
        return this.entry_list
      }
      return this.entry_list.slice(0, 4)
    }
  },
  data() {
    return {
      swiperOptions: {
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        loop: true,
        autoplay: {
          delay: 3000
        },
        pagination: {
          el: '.pagination-home'
        }
        // Some Swiper option/callback...
      },

      // 新闻分类
      newsCats: [],
      // 英雄分类
      heroCats: [],
      // 是否全部显示
      isShowAll: false,
      entry_list: [
        { icon: 'news', name: '爆料站' },
        { icon: 'stories', name: '故事站' },
        { icon: 'mall', name: '周边商城' },
        { icon: 'test', name: '体验服' },
        { icon: 'new', name: '新人专区' },
        { icon: 'honor', name: '荣耀·传承' }
      ]
    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats() {
      const res = await this.$http.get('heros/list')
      this.heroCats = res.data
    }
  }
}
</script>

<style lang="scss">
@import '../assets/scss/variables';
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
    background-position: 63.546% 15.517%;
    width: 1.7692rem;
    height: 1.5385rem;
  }
  &.sprite-stories {
    background-position: 90.483% 15.614%;
    width: 1.7692rem;
    height: 1.5385rem;
  }
  &.sprite-mall {
    background-position: 36.746% 0.924%;
    width: 1.4615rem;
    height: 1.6923rem;
  }

  &.sprite-test {
    background-position: 10.408% 15.517%;
    width: 1.5385rem;
    height: 1.5385rem;
  }
  &.sprite-new {
    background-position: 9.302% 0.813%;
    width: 2.3846rem;
    height: 1.9231rem;
  }
  &.sprite-honor {
    background-position: 9.302% 0.813%;
    width: 2.3846rem;
    height: 1.9231rem;
  }
  &.sprite-arrow-up {
    background-position: 38.577% 52.076%;
    width: 0.7692rem;
    height: 0.7692rem;
  }
  &.sprite-arrow-down {
    transform: rotate(180deg);
    background-position: 38.577% 52.076%;
    width: 0.7692rem;
    height: 0.7692rem;
  }
}
</style>
