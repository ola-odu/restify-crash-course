const restify = require('restify')
const http = require('http')
const config = require('config')

const server = http.createServer()

const port = process.env.PORT || 5000


server.listen(port,() => {
    console.log(`Server successfully started on port: ${port}`)
}) 