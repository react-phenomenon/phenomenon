/* eslint-disable */
const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const os = require('os')

const port = process.env.PORT || 4004

app.use(express.static('build'))

const httpsServer = https.createServer(
    {
        key: fs.readFileSync('cert/server.key'),
        cert: fs.readFileSync('cert/server.crt'),
    },
    app,
)

httpsServer.listen(port, function() {
    console.log('API Server Started On Port %d', port)
})

const io = require('socket.io')(httpsServer)

io.on('connection', socket => {
    console.log('connected')

    socket.on('disconnect', () => {
        console.log('disconnected')
    })

    socket.on('pointer-move', data => {
        console.log('pointer-move', data)
        io.emit('pointer', data)
    })
})

const interfaces = os.networkInterfaces()

Object.keys(interfaces).forEach(name => {
    interfaces[name].forEach(interface => {
        if ('IPv4' !== interface.family || interface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return
        }

        console.log(`\n    https://${interface.address}:${port}/remote \n`)
    })
})
