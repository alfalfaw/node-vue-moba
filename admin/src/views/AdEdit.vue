<template>
  <div>
    <h1>{{ id ? '编辑' : '新建' }}广告位</h1>
    <!-- 阻止表单提交后跳转 @submit.native.prevent -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">
        <el-button size="small" @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
        <el-row type="flex" style="flex-wrap:wrap;">
          <el-col :md="12" v-for="(item, index) in model.items" :key="index">
            <el-form-item label="URL" style="margin-bottom:0.5rem;">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" size="small" @click="model.items.splice(index, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: []
      }
    }
  },
  created() {
    // 如果id存在表示编辑
    this.id && this.fetch()
  },
  methods: {
    /**
     * 添加或删除
     */
    async save() {
      if (this.id) {
        // 编辑
        await this.$http.put(`rest/ads/${this.id}`, this.model)
      } else {
        // 添加
        await this.$http.post('rest/ads', this.model)
      }

      this.$router.push('/ads/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    /**
     * 获取单个
     */
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({}, this.model, res.data)
    }
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
  /* width: 5rem;
  height: 5rem; */
  /* line-height: 5rem; */
  text-align: center;
}
.avatar {
  max-width: 100%;
  height: 5rem;
  display: block;
}
</style>
