// console.log("Testing")
const { v4 : uuid } = require('uuid')
const { format } = require('date-fns');
const fs = require('fs')
const fsPromises = require('fs').promises;
const path = require('path')

const logEvents = async (mess,logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logTime = `${dateTime}\t${uuid()}\t${mess}\n\n`
    console.log(logTime)
    try {
        if (!fs.existsSync(path.join(__dirname,'..' ,'logs'))) {
            await fsPromises.mkdir(path.join(__dirname,'..','logs'))
        }
        await fsPromises.appendFile(path.join(__dirname,'..','logs',logName),logTime)
    } catch (err) {
        console.log(err)
    }
}
const logger =(request, response, next) => {
    logEvents(`${request.method}\t${request.headers.origin}\t${request.url}`,'reqLog.txt')
    console.log(`${request.method} ${request.path}`)
    next();
}
module.exports = { logger,logEvents }
// console.log(format(new Date(), "yyyyMMdd\tHH:mm:ss"))
// 
// console.log(uuid())