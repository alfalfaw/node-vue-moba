module.exports = (options) => {
  // jsonwebtoken
  const jwt = require('jsonwebtoken')
  // 断言
  const assert = require('http-assert')
  // 管理员模型
  const AdminUser = require('../models/AdminUser')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '')
      .split(' ')
      .pop()

    assert(token, 401, 'token不存在')

    // req.app和app是等价的
    const { id } = jwt.verify(token, req.app.get('secret'))
    assert(id, 401, '无效的token')

    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')

    next()
  }
}
