module.exports = (app) => {
  const express = require('express')

  const router = express.Router({
    // 将父级参数(/admin/api/rest/:resource)合并到子级路由,即可以通过req.params获得父级路由参数
    mergeParams: true
  })

  // 新增
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 列表
  router.get('/', async (req, res) => {
    // populate用来查询关联字段，得到的是完整数据，而不仅仅是_id
    // const items = await req.Model.find().populate('parent').limit(10)

    // 特殊处理: 有些接口无需关联查询
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(items)
  })

  // 单个
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // rest后面可以是任何资源
  app.use(
    '/admin/api/rest/:resource',
    async (req, res, next) => {
      // .classify 将小写复数转为大写单数
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )

  // 上传图片
  const multer = require('multer')

  const upload = multer({ dest: __dirname + '/../../uploads' })
  // 该中间件将文件赋值到req.file
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
}
