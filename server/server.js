const express = require('express')
const app = express()
require('./routers/admin/index')(app)
require('./plugins/db')(app)
app.use('/uploads', express.static(__dirname + '/uploads'))
app.listen(3000, () => {
    console.log('start port 3000!')
})