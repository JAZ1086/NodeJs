const { response } = require('express');
const express = require('express');
const app = express();
// Route for handling get request for path /
app.use(express.static('images'))
app.use(express.static('htmls'))
// Attach the express.json middleware to route "/products"
// handle post request for path /products
/***
 * Here we are attaching the express.json middleware by calling the use() function on the app object. We have also configured a maximum size of 100 bytes for the JSON request.
 * We have used a slightly different signature of the use() function than the signature of the function used before. The use() function invoked on the app object here takes the URL of the route: /products to which the middleware function will get attached, as the first parameter. Due to this, this middleware function will be called only for this route.
 * 
 * 
 */
app.use('/products', express.json({limit:100}))

app.post('/products', (request, response) => {
    const products = []
    const name = request.body.name
    const brand = request.body.brand
    const category = request.body.category
    console.log(name + " " + brand + " " + category)

    response.json()
})
// app.get('/', (request,response) => {
    // response.send('response for GET request')
// })
// 
// Route for handling post request for path /products
// 
// app.post('/product', (request,response) => {
    // response.sendFile('productsample.html')
// })
/**
 * As an example, let us check for the presence of JSON content in the HTTP POST 
 * request body before allowing any further processing and send back an error
 * response if the request body does not contain JSON content. 
 * Our middleware function for checking for the presence of JSON content looks like
 * this:
 */
const requireJSONContent = (request,response,next) => {
    if (request.headers['content-type'] !== 'application/json') {
        response.status(400).send('Server requires application/json')
    } else {
        next()
    }
}
app.post('/products', requireJSONContent, (request, response) => {
    response.json()
})
app.listen(3000, () => {
    console.log('Server listening on port 3000.')
})