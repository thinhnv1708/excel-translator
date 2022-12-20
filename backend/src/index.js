require('dotenv').config()
const express = require('express')
const connectDataBase = require('./mongoose')
const { HTTP_CODE } = require('./common/constant')
const { commonMessage } = require('./common/message')
const { mainRouter } = require('./router')
var bodyParser = require('body-parser')


connectDataBase().then(() => {

    const app = express()
    app.use(express.static('assets'))
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())

    app.use('/main', mainRouter)

    app.use((req, res, next) => {
        return res.status(HTTP_CODE.NOT_FOUND).json({
            message: commonMessage.NOT_FOUND
        })
    })

    app.use((err, req, res, next) => {
        console.error(err.stack)
        return res.status(HTTP_CODE.INTERNAL_ERROR).json({
            message: commonMessage.INTERNAL_ERROR
        })
    })

    const port = process.env.PORT

    app.listen(port, () => {
        console.log('Server started on port:', port);
    })

}).catch((err) => { })
