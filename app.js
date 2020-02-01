const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const routers = require('./server/routers')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const PORT = config.get('port') || 5000

routers.forEach(router => app.use(`/api/${router.path}`, router.router))

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        app.listen(PORT, () => {
            console.log(`App has been started on ${PORT}`)
        })
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

start()

module.exports = { app }
