<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}英雄</h1>
    <!-- 阻止表单提交后跳转 @submit.native.prevent -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'avater', res.url)"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="model.avater" :src="model.avater" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="背景">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner', res.url)"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <!-- multiple 表示多选 -->
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item of categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <!-- multiple 表示多选 -->
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <!-- multiple 表示多选 -->
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.skills.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button size="small" @click="model.partners.push({})"><i class="el-icon-plus"></i>添加搭档</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item, index) in model.partners" :key="index">
              <el-form-item label="英雄">
                <!-- filterable 可以筛选 -->
                <el-select filterable v-model="item.hero">
                  <el-option v-for="hero in heros" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="danger" size="small" @click="model.partners.splice(index, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem;">
        <!-- native-type="submit" 原生类型 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      heros: [],
      model: {
        name: '',
        avater: '',
        banner: '',
        title: '',
        skills: [],
        partners: [],
        // 如果数据是一个对象，取对象的值时为了避免出现undefined错误，先将其赋值为空对象
        scores: {
          diffcult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        }
      },
      // 类别
      categories: [],
      // 物品
      items: []
    }
  },
  created() {
    // 如果id存在表示编辑
    this.id && this.fetch()

    // 获取分类
    this.fetchCategories()

    // 获取物品
    this.fetchItems()

    // 获取英雄
    this.fetchHeros()
  },
  methods: {
    /**
     * 添加或删除
     */
    async save() {
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/heros/${this.id}`, this.model)
      } else {
        // 添加
        await this.$http.post('rest/heros', this.model)
      }

      this.$router.push('/heros/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    /**
     * 获取分类
     */
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    /**
     * 获取物品
     */
    async fetchItems() {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },
    /**
     * 获取英雄
     */
    async fetchHeros() {
      const res = await this.$http.get(`rest/heros`)
      this.heros = res.data
    },
    /**
     * 获取单个英雄数据
     */
    async fetch() {
      const res = await this.$http.get(`rest/heros/${this.id}`)
      // this.model = res.data
      // 使用 Object.assign 是为了保持原有默认数据
      this.model = Object.assign({}, this.model, res.data)
    },
    /**
     * to do 上传图片前验证
     */
    beforeAvatarUpload() {}
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
