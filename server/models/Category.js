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
module.exports = mongoose.model('Category', schema)
