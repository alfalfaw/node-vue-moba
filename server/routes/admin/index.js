module.exports = (app) => {
  const express = require('express')
  // jsonwebtoken
  const jwt = require('jsonwebtoken')
  // 断言
  const assert = require('http-assert')
  // 管理员模型
  const AdminUser = require('../../models/AdminUser')

  const router = express.Router({
    // 将父级参数(/admin/api/rest/:resource)合并到子级路由,即可以通过req.params获得父级路由参数
    mergeParams: true
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')

  // 资源中间键
  const resourceMiddleware = require('../../middleware/resource')

  // 新增资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 修改资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })

  // 资源列表
  router.get('/', async (req, res) => {
    // populate用来查询关联字段，得到的是完整数据，而不仅仅是_id
    // const items = await req.Model.find().populate('parent').limit(10)

    // 特殊处理: 有些接口无需关联查询
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })

  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // rest后面可以是任何资源
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 上传图片
  const multer = require('multer')
  const MAO = require('multer-aliyun-oss')

  const upload = multer({
    // dest: __dirname + '/../../uploads'
    storage: MAO({
      config: {
        region: '<region>',
        accessKeyId: '<accessKeyId>',
        accessKeySecret: '<accessKeySecret>',
        bucket: '<bucket>'
      }
    })
  })
  // 该中间件将文件赋值到req.file
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    // file.url = `http://localhost:3000/uploads/${file.filename}`
    file.url = `https://moba.alfalfa.website/uploads/${file.filename}`
    res.send(file)
  })

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1. 根据用户名查找用户
    // select('+password')表示读取密码字段
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')

    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }

    // 2. 检验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '用户密码错误')
    // if (!isValid) {
    //   return res.status(422).send({
    //     message: '用户密码错误'
    //   })
    // }

    // 3. 返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

  // 错误处理函数，错误处理函数具有四个参数. 必须 express 5+ 才生效
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
