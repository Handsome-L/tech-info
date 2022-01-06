const router = require('express').Router()

const { categoryValidator } = require('../model/categories')
const validator = require('../middleware/validate')
const categories = require('../controller/categories')
const auth = require('../middleware/auth')

// 获取全部
router.get('/', auth, categories.getAll)

// 获取某个
router.get('/:cid', auth, categories.get)

// 添加新的
router.post('/', [auth, validator(categoryValidator)], categories.create)

// 编辑某个
router.put('/:cid', [auth, validator(categoryValidator)], categories.update)

// 删除某个
router.delete('/:cid', auth, categories.remove)

module.exports = router
