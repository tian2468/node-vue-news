// 登录校验中间件
module.exports = options => async (req, res, next) => {
    const jwt = require('jsonwebtoken')
    const User = require('../models/User')
    const assert = require('http-assert')
    // 服务端校验
    const token = await String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请登录！')
    const {
        id
    } = jwt.verify(token, req.app.get('key'))
    assert(id, 401, '请登录！')
    req.user = await User.findById(id)
    assert(req.user, 401, '请登录！')
    await next()
}