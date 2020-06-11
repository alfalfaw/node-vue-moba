const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// 跨域
app.use(require('cors')())
// 解析body数据
app.use(express.json())
// 托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))
// 导入admin的路由
require('./routes/admin')(app)
// mongo数据库
require('./plugins/db')(app)
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
