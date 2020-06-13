<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" alt="" height="30px" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="text-white pl-2">攻略站</span>
      </div>

      <router-link to="/" tag="div" class="fs-sm">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3 d-flex flex-column jc-end h-100">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">
          {{ model.categories.map(v => v.name).join('/') }}
        </div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-brown"> {{ model.scores.difficult }} </span>

            <span>技能</span>
            <span class="badge bg-blue-1"> {{ model.scores.skills }} </span>

            <span>攻击</span>
            <span class="badge bg-danger"> {{ model.scores.attack }} </span>

            <span>生存</span>
            <span class="badge bg-dark"> {{ model.scores.survive }} </span>
          </div>
          <router-link to="/" tag="span">皮肤2 &gt;</router-link>
        </div>
      </div>
    </div>
    <!-- end of top -->
    <div>
      <div class="bg-white px-3">
        <div class="nav d-flex pt-3 pb-2 jc-around border-bottom">
          <div class="nav-item active">
            <div class="nav-link">
              英雄初识
            </div>
          </div>
          <div class="nav-item">
            <div class="nav-link">
              进阶攻略
            </div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-3  bg-white border-bottom">
              <div class="d-flex">
                <router-link tag="button" to="/" class="btn btn-lg  flex-1 ">
                  <i class="icon iconfont icon-menu"></i>
                  英雄介绍视频
                </router-link>
                <router-link tag="button" to="/" class="btn btn-lg  flex-1 ml-2 ">
                  <i class="icon iconfont icon-menu "></i>
                  一图识英雄
                </router-link>
              </div>

              <div class="skills mt-4">
                <div class="d-flex jc-around">
                  <img
                    @click="currentSkillIndex = i"
                    class="icon"
                    :class="{ active: currentSkillIndex === i }"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="item.name"
                    alt=""
                    width="60"
                    height="60"
                    style="border-radius:50%;"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex ai-center pt-4 pb-3">
                    <h3 class="m-0">{{ currentSkill.name }}</h3>
                    <span class="text-grey-1 ml-4"> (冷却值：{{ currentSkill.delay }} 消耗：{{ currentSkill.cost }}) </span>
                  </div>

                  <p>{{ currentSkill.description }}</p>
                  <div class="border-bottom"></div>
                  <p>小提示：{{ currentSkill.tips }}</p>
                </div>
              </div>
            </div>

            <m-card plain icon="menu" title="出装推荐" class="hero-items">
              <div class="fs-lg mt-1">
                顺风出装
              </div>
              <div class="d-flex jc-around text-center mt-2">
                <div v-for="item in model.items1" :key="item.name">
                  <img :src="item.icon" alt="" />
                  <div class="fs-xs">{{ item.name }}</div>
                </div>
              </div>
              <div class="border-bottom mt-3"></div>
              <div class="fs-lg mt-3">
                逆风出装
              </div>
              <div class="d-flex jc-around text-center mt-2">
                <div v-for="item in model.items2" :key="item.name">
                  <img :src="item.icon" alt="" />
                  <div class="fs-xs">{{ item.name }}</div>
                </div>
              </div>
            </m-card>

            <m-card plain icon="menu" title="使用技巧">
              <p class="m-0">{{ model.usageTips }}</p>
            </m-card>

            <m-card plain icon="menu" title="对抗技巧">
              <p class="m-0">{{ model.battleTips }}</p>
            </m-card>

            <m-card plain icon="menu" title="团战思路">
              <p class="m-0">{{ model.teamTips }}</p>
            </m-card>

            <m-card plain icon="menu" title="英雄关系">
              <div class="fs-xl ">
                最佳搭档
              </div>
              <div class="pt-3" v-for="item in model.partners" :key="item.name">
                <div class="d-flex">
                  <img :src="item.hero.avater" alt="" height="50" />
                  <p class="flex-1 ml-3 m-0">
                    {{ item.description }}
                  </p>
                </div>
                <div class="border-bottom mt-3"></div>
              </div>
            </m-card>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      model: null,
      currentSkillIndex: 0
    }
  },

  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heros/${this.id}`)
      this.model = res.data
    }
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
.page-hero {
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .top {
    height: 50vw;
    background-size: auto 100%;
    background: #fff no-repeat top center;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }

  .nav {
    .nav-item {
      // 即使透明也要加边框，防止不对齐
      border-bottom: 3px solid transparent;
      padding-bottom: 0.2rem;
      &.active {
        .nav-link {
          color: map-get($colors, 'primary');
        }
        border-bottom: 3px solid map-get($colors, 'primary');
      }
    }
  }
  .skills {
    img.icon {
      border: 3px solid map-get($colors, 'white');
      &.active {
        border-color: map-get($colors, 'primary');
      }
    }
  }
  .hero-items {
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
    }
  }
}
</style>
