module.exports = app => {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    })
    const jwt = require('jsonwebtoken')
    const User = require('../../models/User')
    const assert = require('http-assert')
    const loginAuth = require('../../middleware/LoginAuto')
    const resourceMiddleware = require('../../middleware/Resource')
    app.set('key', 'aadczvasfdfsadf54654DQE464')
    app.use(express.json())
    app.use(require('cors')())

    // 创建
    router.post('/', async (req, res) => {
        const data = await req.Model.create(req.body)
        res.send(data)
    })
    // 查询
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent'
        } else if (req.Model.modelName === 'News') {
            queryOptions.populate = 'categories'
        }
        const data = await req.Model.find().setOptions(queryOptions)
        res.send(data)
    })
    // 查询详情
    router.get('/:id', async (req, res) => {
        const data = await req.Model.findById(req.params.id)
        res.send(data)
    })
    // 修改
    router.put('/:id', async (req, res) => {
        const data = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(data)
    })
    // 删除
    router.delete('/:id', async (req, res) => {
        const data = await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 通用CRUD接口
    app.use('/admin/api/rest/:resource', loginAuth(), resourceMiddleware(), router)
    // 上传文件
    const multer = require('multer')
    // const upload = multer({
    //     dest: __dirname + '/../../uploads'
    // })
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../uploads')
        },
        filename: function (req, file, cb) {
            console.log(file)
            var singfileArray = file.originalname.split('.');
            var fileExtension = singfileArray[singfileArray.length - 1];
            cb(null, singfileArray[0] + '-' + Date.now() + "." + fileExtension);
        }
    })
    const upload = multer({
        storage
    })
    app.post('/admin/api/upload', loginAuth(), upload.single('upload'), async (req, res) => {
        const file = req.file
        file.url = `http://news.tzzown.com/uploads/${file.filename}`
        res.send(file)
    })
    // 用户相关
    // 新建用户
    app.post('/admin/api/users', loginAuth(), async (req, res) => {
        const User = require('../../models/User')
        const data = await User.create(req.body)
        console.log(data)
    })
    // 登录
    app.post('/admin/api/login', async (req, res) => {
        const {
            username,
            password
        } = req.body
        const data = await User.findOne({
            username
        }).select('+password')
        assert(data, 422, '该用户不存在!')
        const isValid = require('bcrypt').compareSync(password, data.password)
        assert(isValid, 422, '密码错误!')
        const token = jwt.sign({
            id: data._id
        }, app.get('key'))
        res.send({
            msg: 'ok',
            token
        })
    })
    // 错误处理
    app.use(async (err, req, res, next) => {
        console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}