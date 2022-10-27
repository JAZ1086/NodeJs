const fsPromises = require('fs').promises;
const path = require("path")

//Read A File

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'),'utf8')
        console.log(data)
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data);
        await fsPromises.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newdata= await fsPromises.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'),'utf8')
        console.log(newdata)
    } catch (err) {
        console.log(err)
    }
}

fileOps();
// fs.readFile(path.join(__dirname,'files','starter.txt'),'utf8' ,(err,data) => {
    // if (err) throw err;
    // console.log(data.toString())
// })
// 
// Write A File
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), "Nice to  meet you", (err) => {
    // if (err)
        // throw err;
    // console.log("Write complete")
// })
// 
// fs.appendFile(path.join(__dirname, 'files', 'test.txt'), "Testing", (err) => {
    // if (err)
        // throw err;
    // console.log("Append Complet")
// })