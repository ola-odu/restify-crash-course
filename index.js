const restify = require('restify')
const config = require('config')
const http = require('http')
//const config = require('config')

const server = http.createServer()
//const app = restify()

const port = config.get('port')

const connectDB = require('./src/db/db')
connectDB()


server.listen(port,() => {
    console.log(`Server successfully started on port: ${port}`)
}) 
