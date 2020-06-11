<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}物品</h1>
    <!-- 阻止表单提交后跳转 @submit.native.prevent -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    },
    /**
     * to do 上传图片前验证
     */
    beforeAvatarUpload() {},
    /**
     * 上传图片成功
     */
    async handleAvatarSuccess(res) {
      // 这里直接赋值是不可行的，因为model最开始没有icon属性
      // this.model.icon = res.url
      this.$set(this.model, 'icon', res.url)
    }
  }
}
</script>

<style>
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
