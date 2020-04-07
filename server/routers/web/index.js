module.exports = app => {
    const express = require('express')
    const router = express.Router()
    const Resource = require('../../middleware/Resource')
    router.get('/', async (req, res) => {
        let condition
        let queryOptions = {}
        if (req.Model.modelName === 'Banner') {
            condition = {
                hidden: true
            }
        } else if (req.Model.modelName === 'News') {
            queryOptions.populate = 'categories'
        }
        const data = await req.Model.find(condition).setOptions(queryOptions)
        res.send(data)
    })
    router.get("/:id", async (req, res) => {
        let queryOptions = {}
        if (req.Model.modelName === 'News') {
            queryOptions.populate = 'categories'
        }
        const data = await req.Model.findById(req.params.id).setOptions(queryOptions)
        res.send(data)
    })
    app.use('/web/api/rest/:resource', Resource(), router)
}