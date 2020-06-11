<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <!-- 阻止表单提交后跳转 @submit.native.prevent -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="model.icon"></el-input>
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
      model: {}
    }
  },
  created() {
    // 如果id存在表示编辑分类
    this.id && this.fetch()
  },
  methods: {
    /**
     * 添加或删除分类
     */
    async save() {
      if (this.id) {
        // 编辑分类
        await this.$http.put(`rest/items/${this.id}`, this.model)
      } else {
        // 添加分类
        await this.$http.post('rest/items', this.model)
      }

      this.$router.push('/items/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    /**
     * 获取单个分类
     */
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    }
  }
}
</script>

<style></style>
