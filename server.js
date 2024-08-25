const express = require('express')
const app = express()
const config = require("./config.json")
const bodyParser = require('body-parser')
const udp = require('./udp')
const controller = require('./controller')

// middlewares
app.use(bodyParser.json())

// routes
app.post('/wake-on-lan', controller.broadcastWakeOnLan)

// server start
udp.connect(() => {
    udp.enableBroadcast(true)
    app.listen(config.serverPort, () => {
        console.log(`Server listening on port ${config.serverPort}`)
    })
})