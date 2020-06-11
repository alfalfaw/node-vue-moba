<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}分类</h1>
    <!-- 阻止表单提交后跳转 @submit.native.prevent -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- native-type="submit" 原生类型 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Object
    }
  },
  data() {
    return {
      model: {},
      // 父级选项
      parents: []
    }
  },
  created() {
    // 如果id存在表示编辑分类
    this.id && this.fetch()
    // 获取所有分类
    this.fetchParents()
  },
  methods: {
    /**
     * 添加或删除分类
     */
    async save() {
      let res
      if (this.id) {
        // 编辑分类
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      } else {
        // 添加分类
        res = await this.$http.post('rest/categories', this.model)
      }
      console.log(res)
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    /**
     * 获取单个分类
     */
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },

    /**
     * 获取所有分类
     */
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  }
}
</script>

<style></style>
