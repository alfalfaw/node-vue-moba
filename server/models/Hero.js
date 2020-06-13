const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  name: {
    type: String
  },
  avater: {
    type: String
  },
  banner: {
    type: String
  },

  title: {
    type: String
  },
  // 数组字段
  categories: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category'
    }
  ],
  // 评分
  scores: {
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  // 技能
  skills: [
    {
      icon: {
        type: String
      },
      name: {
        type: String
      },
      description: {
        type: String
      },
      tips: {
        type: String
      },
      cost: {
        type: String
      },
      delay: {
        type: String
      }
    }
  ],
  // 装备1
  items1: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Item'
    }
  ],
  // 装备2
  items2: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Item'
    }
  ],
  usageTips: {
    type: String
  },
  battleTips: {
    type: String
  },
  teamTips: {
    type: String
  },
  partners: [
    {
      hero: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Hero'
      },
      description: {
        type: String
      }
    }
  ]
})
// 加第三个参数可以指定数据表名
module.exports = mongoose.model('Hero', schema)
