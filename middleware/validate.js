module.exports = (validator) => {
  return (req, res, next) => {
    const { error, value } = validator(req.body)
    console.log(error)
    if (error) {
      // 说明不满足校验规则，无需向后执行
      return res.status(400).json({
        code: 400,
        value: error._original,
        msg: error.details[0].message
      })
    }
    // 数据验证通过，同时处理成功
    req.validValue = value
    next()
  }
}
