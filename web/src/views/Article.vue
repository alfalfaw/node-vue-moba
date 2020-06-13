<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 ai-center border-bottom">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-blue pl-2 text-ellipsis">{{ model.title }}</strong>
      <div class="text-grey fs-xs">
        2020-5-19
      </div>
    </div>
    <div v-html="model.body" class="px-3 body"></div>
    <div class="px-3 border-top pt-3">
      <div class="d-flex ai-center">
        <span class="icon iconfont icon-menu"></span>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
    </div>
    <div class="pt-2 px-3">
      <router-link class="py-1" :to="`/articles/${item._id}`" tag="div" v-for="item in model.related" :key="item._id">
        {{ item.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { requires: true }
  },
  data() {
    return {
      model: {}
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`)

      this.model = res.data
    }
  }
}
</script>

<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    .iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
