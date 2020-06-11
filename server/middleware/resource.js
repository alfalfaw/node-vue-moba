module.exports = (options) => {
  return async (req, res, next) => {
    // .classify 将小写复数转为大写单数
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
  }
}
