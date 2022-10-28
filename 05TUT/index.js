const http = require('http');
const { threadId } = require('worker_threads');
const app = require('./server')
require('dotenv').config()
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})
// console.log(cloudinary.api.API_KEY)
const normalizePort = (val) => {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false;
}
const port = normalizePort(process.env.PORT|| '3000')
app.set('port', port)

const errotHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe' + address : 'port:' + port
    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privileges.')
            process.exit(1)
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is alredy in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/*
The normalizePort function returns a valid port, whether it is provided as a number or a string.

The errorHandler function checks for various errors and handles them appropriately — it is then registered to the server.

A listening event listener is also registered, logging the port or named pipe on which the server is running to the console.
*/

const server = http.createServer(app)

server.on('error', errotHandler);
server.on('listening', ()=> {
    const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
})

server.listen(3000)