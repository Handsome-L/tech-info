const config = require('../config')
const mongoose = require('mongoose')

// 连接 MongoDB
mongoose.connect(config.db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('err', err => {
  console.log('连接失败', err)
})

db.on('open', () => {
  console.log('连接成功')
})
