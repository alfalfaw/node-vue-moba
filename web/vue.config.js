module.exports = {
  // 文件打包路径
  outputDir: __dirname + '/../server/web'
  // 配置静态文件的路径，默认打包后的静态文件引用路径是 /css 、/js ,如果需要将其放置到子文件夹，如访问路径为 /admin/css 、 /admin/js ,就需要进行如下配置
  // publicPath: process.env.NODE_ENV === 'production' ? '/web' : '/'
}
