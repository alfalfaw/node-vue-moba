<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="物品id" width="230"> </el-table-column>

      <el-table-column prop="name" label="物品名称"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/items/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetch()
  },

  methods: {
    /**
     * 获取所有物品
     */
    async fetch() {
      const res = await this.$http.get('rest/items')
      this.items = res.data
    },
    /**
     * 删除物品
     */
    async remove(row) {
      this.$confirm(`是否确定要删除物品 ${row.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/items/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.fetch()
      })
    }
  }
}
</script>

<style></style>
