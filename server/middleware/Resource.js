// 获取模块资源中间件
module.exports = options => async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../models/${modelName}`)
    next()
}