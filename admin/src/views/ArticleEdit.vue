<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}文章</h1>
    <!-- 阻止表单提交后跳转 @submit.native.prevent -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="文章详情">
        <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <!-- native-type="submit" 原生类型 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  props: {
    id: {
      type: Object
    }
  },
  data() {
    return {
      model: {},

      categories: []
    }
  },
  components: {
    VueEditor
  },
  created() {
    // 如果id存在表示编辑
    this.id && this.fetch()
    // 获取所有分类
    this.fetchCategories()
  },
  methods: {
    /**
     * 添加或删除分类
     */
    async save() {
      if (this.id) {
        // 编辑文章
        await this.$http.put(`rest/articles/${this.id}`, this.model)
      } else {
        // 添加文章
        await this.$http.post('rest/articles', this.model)
      }

      this.$router.push('/articles/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    /**
     * 获取单个文章
     */
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },

    /**
     * 获取所有分类
     */
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    /**
     * 图片上传
     */
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      formData.append('file', file)
      const res = await this.$http.post('upload', formData)
      Editor.insertEmbed(cursorLocation, 'image', res.data.url)
      resetUploader()
    }
  }
}
</script>

<style></style>
