const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    // select:false 的字段不能被查询到，这样在修改密码时不会显示原密码，而且如果密码框为空，保存时原密码也不会修改
    select: false,
    // 保存前对密码进行加密
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
})
module.exports = mongoose.model('AdminUser', schema)
