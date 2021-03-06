const express = require('express')
const app = express()
const compression = require('compression')
const PORT = process.env.PORT || 3000

// 将秘钥挂载在Express实例上,在真实项目中应该保存在环境变量
app.set('secret', 'dahqoenrqnfsxi')
// 跨域
app.use(require('cors')())
// 解析body数据
app.use(express.json())
// 开启gzip压缩, 必须放到托管静态文件之前
app.use(compression())
// 托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
// 通过 /admin 访问
app.use('/admin', express.static(__dirname + '/admin'))
// 通过 / 访问
app.use('/', express.static(__dirname + '/web'))
// 导入admin的路由
require('./routes/admin')(app)
// 导入web路由
require('./routes/web')(app)
// mongo数据库
require('./plugins/db')(app)
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
