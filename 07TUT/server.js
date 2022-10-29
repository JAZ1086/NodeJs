const { nextDay } = require('date-fns');
const { response } = require('express');
const express = require('express');
const { request } = require('http');
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500;


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
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
)