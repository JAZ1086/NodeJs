const { nextDay } = require('date-fns');
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const cors = require('cors')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500;
const logEvents = require('./logs/middleware/logEvents')
//custom middleware logger

app.use(logEvents.logger)

//cross origin resource shearing
const whiteList = ['https://www.google.com/','http://localhost:3500']
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1  || !origin) {
            callback(null,true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
        optionsSuccessStatus: 200
    }
}
app.use(cors(corsOptions))
// built in middlewear to handle urlencoded data
// in other words, form data
// content  type
app.use(express.urlencoded({ extended: false }))
//built in middleware for json
app.use(express.json());
//server static files
app.use(express.static(path.join(__dirname, './public')))

app.get('ˆ/$|/index(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname,'views','index.html'))
    //response.sendFile('./views/index.html', {root:__dirname})
})
app.get('/new-page(.html)?', (request,response) => {
    response.sendFile(path.join(__dirname,'views','new-page.html'))
})
app.get('/old-page(.html)?', (request,response) => {
    response.redirect(301,'/new-page.html') //301 for redirect
})
app.get('/*', (request,response) => {
    response.status(404).sendFile(path.join(__dirname,'views','404.html')) //40 
})
app.get('/hello(.html)?', (request, response) => {
    console.log("attempted to lod hello.html")
    next()
})
app.all('*', (request, response) => {
    response.status(404);
    if (request.accepts('html')) {
        response.sendFile(path.join(__dirname,'views','404.html'))
    } else if (request.accepts('json')) {
        response.json({error: '404 Not Found'})
    } else {
        response.type('txt').send('404 Not Found')
    }
})
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
)