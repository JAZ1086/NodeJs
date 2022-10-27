const fs = require('fs');

//Reading leard streams of data
const rs = fs.createReadStream('./files/lerm.txt', { encoding: 'utf8' });
const ws = fs.createWriteStream('./files/new-lerm.txt')


//listening to data stream and writing it to a file
rs.pipe(ws)
// rs.on('data', (dataChuck) => {
    // ws.write(dataChuck)
// })
