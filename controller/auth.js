const { User } = require('../model/user')
const bcrypt = require('bcrypt')

exports.test = async (req, res, next) => {
  try {
    // 1 检测用户是否存在
    const validValue = req.validValue
    let user = await User.findOne({ email: validValue.email })
    // 如果获取不到，说明用户不存在
    if (!user) {
      return res.status(400).json({
        code: 400,
        msg: '用户名或密码错误'
      })
    }
    // 获取到用户信息，再检测密码的正确性
    const compareResult = await bcrypt.compare(validValue.password, user.password)
    if (!compareResult) {
      return res.status(400).json({
        code: 400,
        msg: '用户名或密码错误'
      })
    }
    res.status(200).json({
      code: 200,
      msg: '登录成功',
      authorization: {
        access_token: user.generateToken(user)
      }
    })
  } catch (err) {
    next(err)
  }
}