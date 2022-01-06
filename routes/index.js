const router = require('express').Router()

// 用户接口
router.use('/user', require('./user'))

// 登录接口
router.use('/auth', require('./auth'))

// 分类接口
router.use('/categories', require('./categories'))

// 文章接口
router.use('/articles', require('./articles'))

module.exports = router
