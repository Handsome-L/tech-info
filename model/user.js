const mongoose = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('../config')
Joi.objectId = require('joi-objectid')(Joi)

// 定义数据结构
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  }
})

userSchema.methods.generateToken = function () {
  // sign() 参数一：令牌内容 参数二：加密秘钥
  return jwt.sign({
    // this 代表 user 实例，这里不能使用箭头函数，否则 this 指向外界
    _id: this._id
  }, config.jwtPrivateKey)
}

// 创建 Model
const User = mongoose.model('User', userSchema)

function userValidator (data) {
  // 创建内容校验规则对象
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase().required().messages({
      'any.required': '缺少必选参数 email',
      'string.email': 'email 格式错误'
    }),
    name: Joi.string().min(2).max(50).messages({
      'string.base': 'name 必须为 String',
      'string.max': 'name 最多 50 个字符',
      'string.min': 'name 最少 2 个字符'
    }),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,12}$/).exist().messages({
      'string.pattern.base': '密码不符合规则',
      'any.required': '缺少必选参数 password'
    }),
    _id: Joi.objectId()
  })
  return schema.validate(data)
}

module.exports = {
  User,
  userValidator
}
