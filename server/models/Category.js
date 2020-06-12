const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    // 关联到哪个模型
    ref: 'Category'
  }
})

// 分类的虚拟字段 子分类 children
schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})
// 分类的虚拟字段 文章列表 newsList
schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})
module.exports = mongoose.model('Category', schema)
