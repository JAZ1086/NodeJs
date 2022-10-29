const express = require('express');
const app = express();
// Route for handling get request for path /
app.get('/', (request,response) => {
    response.send('response for GET request')
})

// Route for handling post request for path /products

app.post('/products', (request,response) => {
    response.json()
})

app.listen(3000, () => {
    console.log('Server listening on port 3000.')
})