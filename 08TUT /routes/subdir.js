const express = require('express')
const router = express.Router();
const path = require('path')

router.get('ˆ/$|/index(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname,'..','views','subdir','index.html'))
    //response.sendFile('./views/index.html', {root:__dirname})
})

router.get('/test(.html)?', (request, response) => {
    response.sendFile(path.join(__dirname,'..','views','subdir','test.html'))
    //response.sendFile('./views/index.html', {root:__dirname})
})
module.exports = router