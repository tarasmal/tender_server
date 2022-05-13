const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const sequelize = require('./db')
const models = require('./models/models')
const bodyParser = require('body-parser')
const cors = require('cors')
app = express()
app.use(cors())
app.use(bodyParser.json())

//router
const router = require('./routes/router')
const badRequest = require("./middlewares/badRequest")

app.use('/api', router)
app.use(badRequest)

const start = () => {
    try {
        sequelize.authenticate()
        sequelize.sync()
        app.listen(PORT, () => {
            console.log('server started on the port ' + PORT )
        })
    }
    catch (e){
        console.log(e)
    }
}

start()

