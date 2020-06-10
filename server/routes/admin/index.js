module.exports = (app) => {
  const express = require('express')
  // 分类模型
  const Category = require('../../models/Category')
  const router = express.Router()

  // 创建分类
  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })
  // 编辑分类
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除分类
  router.delete('/categories/:id', async (req, res) => {
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 分类列表
  router.get('/categories', async (req, res) => {
    // populate用来查询关联字段，得到的是完整数据，而不仅仅是_id
    const items = await Category.find().populate('parent').limit(10)
    res.send(items)
  })

  // 获取某个分类详情
  router.get('/categories/:id', async (req, res) => {
    const model = await Category.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api', router)
}
