const router = require('express').Router()
const auth = require('../controller/auth')
const validator = require('../middleware/validate')
const { userValidator } = require('../model/user')

// 登录
router.post('/', validator(userValidator), auth.test)

module.exports = router
