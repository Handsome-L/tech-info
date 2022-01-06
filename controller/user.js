// 引入 User 模型
const { User } = require('../model/user')
const { Article } = require('../model/articles')
const bcrypt = require('bcrypt')

// 用户注册接口
exports.register = async (req, res, next) => {
  try {
    // 存储校验过的数据
    let { email, password } = req.validValue
    // 1 查询邮箱是否已经被注册过
    let user = await User.findOne({ email })
    if (user) {
      // 已注册
      return res.status(400).json({
        code: '400',
        msg: '用户已注册',
        data: { email }
      })
    }
    // 2 可注册的新用户
    // genSalt(10) 加盐操作，参数表示程度
    const salt = await bcrypt.genSalt(10)
    password  = await bcrypt.hash(password, salt)
    // 3 创建 user 实例
    user = new User({
      email,
      password,
      name: '请添加用户名'
    })
    // 4 存储
    await user.save()
    // 5 响应
    res.status(200).json({
      code: 200,
      msg: '注册成功',
      data: { email }
    })
  } catch (err) {
    next(err)
  }
}

// 获取用户信息接口
exports.getInfo = async (req, res, next) => {
  try {
    // 1 查询用户信息
    const data = await User.findOne({ _id: req.userData._id }, { password: 0 })
    // 2 发送请求
    res.status(200).json({
      code: 200,
      msg: '获取用户信息成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

exports.updateInfo = async (req, res, next) => {
  try {
    // 1 检查是否存在 _id 参数
    const body = req.body
    if (!body._id) {
      return res.status(400).json({
        code: 400,
        msg: '缺少参数 _id'
      })
    }
    // genSalt(10) 加盐操作，参数表示程度
    const salt = await bcrypt.genSalt(10)
    body.password  = await bcrypt.hash(body.password, salt)
    // 2 检查并更新用户
    const data = await User.findByIdAndUpdate(body._id, body)
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '编辑用户失败'
      })
    }
    // 3 成功响应
    // - 不响应密码信息
    delete body.password
    res.status(200).json({
      code: 200,
      msg: '编辑用户信息成功',
      data: body
    })
  } catch (err) {
    next(err)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    // 1 检查是否存在 _id 参数
    const id = req.body._id
    if (!id) {
      return res.status(400).json({
        code: 400,
        msg: '请传入 id'
      })
    }
    // 2 查找用户数据并删除
    const data = await User.findByIdAndDelete(id)
    
    await Article.remove({
      author: id
    })
    
    // data 为 null 说明删除失败
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '删除用户失败',
        value: {
          _id: id
        }
      })
    }
    // 删除成功
    res.status(200).json({
      code: 200,
      msg: '删除成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
