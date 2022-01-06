const { Category } = require('../model/categories')

// 获取全部
exports.getAll = async (req, res, next) => {
  try {
    const data = await Category.find()
    res.status(200).json({
      code: 200,
      msg: '分类获取成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 添加新的
exports.create = async (req, res, next) => {
  try {
    // 1 检测是否已存在要添加的分类信息
    const data = req.body
    let cate = await Category.findOne(data)
    if (cate) {
      return res.status(400).json({
        code: 400,
        msg: '该分类已存在',
        value: data
      })
    }
    // 2 创建数据
    cate = new Category(data)
    await cate.save()
    res.status(200).json({
      code: 200,
      msg: '分类添加成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 获取某个
exports.get = async (req, res, next) => {
  try {
    // 1 检测是否存在 id - 通过动态路由参数接收
    const cid = req.params.cid
    if (!cid) {
      return res.status(400).json({
        code: 400,
        msg: '请传入分类 id'
      })
    }
    // 2 根据动态路由参数获取分类
    const data = await Category.findById(cid)
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '获取信息失败',
        value: {
          cid
        }
      })
    }
    res.status(200).json({
      code: 200,
      msg: '分类信息获取成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 编辑某个
exports.update = async (req, res, next) => {
  try {
    // 1 检测 id 信息
    const cid = req.params.cid
    if (!cid) {
      return res.status(400).json({
        code: 400,
        msg: '请传入id'
      })
    }
    // 2 根据动态路由参数更新数据 返回参数为旧数据，需传递第三个参数
    const data = await Category.findByIdAndUpdate(cid, req.body, { new: true })
    // 3 判断是否编辑成功
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '编辑分类失败',
        value: req.body
      })
    }
    res.status(200).json({
      code: 200,
      msg: '编辑分类成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 删除某个
exports.remove = async (req, res, next) => {
  try {
    // 1 根据动态路由参数删除数据
    const cid = req.params.cid
    const data = await Category.findByIdAndDelete(cid)
    if (!data) {
      return res.ststus(400).json({
        code: 400,
        msg: '分类删除失败',
        value: {
          cid
        }
      })
    }
    res.status(200).json({
      code: 200,
      msg: '删除分类成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
