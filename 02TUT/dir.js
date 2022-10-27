const fs = require('fs');
//chech if a directory exit
if (!fs.existsSync('./new')){
fs.mkdir('./new ',(err)=>{
    if (err)
        throw err;
    console.log("Directory created")
})
}

else if (fs.existsSync('./new')){
    fs.rmdir('./new ',(err)=>{
    if (err)
        throw err;
    console.log("Directory removed")
})}