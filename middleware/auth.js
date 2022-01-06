const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function (req, res, next) {
  // 接口设置（约定，前端请求头中包含有效的 authorization 字段，值为 access_token）
  // 1 保存数据
  const access_token = req.header('authorization')
  console.log(access_token)
  // 2 检测是否存在 access_token
  if (!access_token) {
    res.status(401).json({
      code: 401,
      msg: 'Unauthorized 无 Token'
    })
  }
  // 3 存在 access_token 时，验证是否有效
  // 解密 参数一：要解密的数据 参数二：解密的秘钥
  // 解密成功 返回数据；解密失败，报错 Token 无效
  try {
    const userData = jwt.verify(access_token, config.jwtPrivateKey)
    console.log(userData)
    // 得到了 token 中存储的数据（用户信息），保存供后续使用
    req.userData = userData
    next()
  } catch (err) {
    return res.status(401).json({
      code: 401,
      msg: 'Unauthorized Token 无效'
    })
  }
}
