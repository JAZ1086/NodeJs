// const http = require('http')
// const path = require('path')
// const fs = require('fs')
// const fsPromises = require('fs').promises;
// const logEvents = require('./logEvents')
// const EventEmitter = require('events')
// class Emitter extends EventEmitter { };
// const myEmitter = new Emitter();

// const PORT = process.env.PORT || 3500;
// const server = http.createServer((request, response) => {
//     console.log(request.url,response.method)
// })

// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
// // myEmitter.on('log', (msg) =>logEvents(msg))

// const { response } = require('express');
const express = require('express');
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.get("/",(request, response) => {
    response.json({message: 'Hey! This is your server response!'})
})

app.post('/image-upload', (request, response) => {
    const data = {
        image: request.body.image
    }
    cloudinary.uploader.upload(data.image)
        .then((result) => {
            response.status(200).send({
                message: "success",
                result,
            }).catch((error) => {
                response.status(500).send({
                    message: "failure",
                    error,
                });
        })
    })
})
module.exports = app