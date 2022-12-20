const express = require('express')

var bodyParser = require('body-parser')


const app = express()
app.use(express.static('assets'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', async function (req, res) {
    const { body } = req

    const result = await Promise.all([
        translatePromise(body.text),

    ])
    res.json({ value: result })
})

app.listen(3000)


