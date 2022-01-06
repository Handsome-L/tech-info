const { Article } = require('../model/articles')

// 获取全部
exports.getAll = async (req, res, next) => {
  try {
    // 检测是否存在 分类/状态 等筛选参数
    const { status, category } = req.query
    let data
    if (status || category) {
      data = await Article.find(req.query)
    } else {
      data = await Article.find()
    }
    res.status(200).json({
      code: 200,
      msg: '获取所有文章成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 添加新的
exports.create = async (req, res, next) => {
  try {
    // 1 创建并存储数据
    const data = new Article(Object.assign(req.body, { author: req.userData._id }))
    await data.save()
    // 2 响应
    res.status(200).json({
      code: 200,
      msg: '添加文章成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 获取某个
exports.get = async (req, res, next) => {
  try {
    // 根据 id 获取数据
    const id = req.params.articleId
    const data = await Article.findById(id).populate('category author', 'name')
    // populate() 另一种传参方式
    // populate([{
    //   path: 'category',
    //   select: 'name'
    // }, {
    //   path: 'author',
    //   select: 'name'
    // }])

    // 检测是否存在数据
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '获取文章失败',
        value: {
          id
        }
      })
    }
    res.status(200).json({
      code: 200,
      msg: '获取文章成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 编辑某个
exports.update = async (req, res, next) => {
  try {
    const data = await Article.findByIdAndUpdate(req.params.articleId, req.body, { new: true })
    // data 为旧数据，这里想要拿到新数据，需添加第三个参数
    // console.log(data)
    // 检测并响应 失败返回旧数据，成功返回新数据
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '文章修改失败',
        value: Object.assign(req.body, {
          _id: req.params.articleId
        })
      })
    }
    res.status(200).json({
      code: 200,
      msg: '文章修改成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 删除某个
exports.remove = async (req, res, next) => {
  try {
    const data = await Article.findByIdAndDelete(req.params.articleId)
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '删除文章失败',
        value: {
          id: req.params.articleId
        }
      })
    }
    res.status(200).json({
      code: 200,
      msg: '删除文章成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
