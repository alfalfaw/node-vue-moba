module.exports = (app) => {
  const router = require('express').Router()

  const Category = require('../../models/Category')
  const Article = require('../../models/Article')
  // 初始化数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.find().where({
      name: '新闻分类'
    })
    const cats = await Category.find().where({ parent }).lean()
    let i = 0
    const newsTitles = new Array(20).fill({}).map(() => {
      i++
      return `新闻${i}`
    })
    const newsList = newsTitles.map((title) => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)

      return {
        categories: randomCats.slice(0, 2),
        title
      }
    })
    // 清空数据库
    await Article.deleteMany({})
    // 插入数据库
    await Article.insertMany(newsList)
    res.send(newsList)
  })

  router.get('/news/list', async (req, res) => {
    // 该方法有些问题
    // const parent = await Category.findOne({
    //   name: '新闻分类'
    // })
    //   .populate({
    //     path: 'children',
    //     populate: {
    //       path: 'newsList'
    //     }
    //   })
    //   .lean()

    const parent = await Category.findOne({ name: '新闻分类' })

    // 将文章进行分类
    const cats = await Category.aggregate([
      // 用match过滤掉不属于该大类的数据
      { $match: { parent: parent._id } },
      // 用lookup进行关联查询
      {
        $lookup: {
          from: 'articles',
          localField: '_id',
          foreignField: 'categories',
          as: 'newsList'
        }
      },
      // 修改查询结果(减少结果个数)
      {
        $addFields: {
          newsList: {
            $slice: ['$newsList', 5]
          }
        }
      }
    ])
    const subCats = cats.map((v) => v._id)
    // 添加新闻综合
    cats.unshift({
      name: '热门',
      newsList: await Article.find()
        .where({
          categories: { $in: subCats }
        })
        .populate('categories')
        .limit(5)
        .lean()
    })
    cats.map((cat) => {
      cat.newsList.map((news) => {
        news.categoryName = cat.name === '热门' ? news.categories[0].name : cat.name
        return news
      })
    })

    res.send(cats)
  })
  app.use('/web/api', router)
}
