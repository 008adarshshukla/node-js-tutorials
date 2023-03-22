const express = require("express")
const app = express()

//products related routes.
const porductRoutes = require('./api/routes/products')
//orders related routes.
const ordersRoutes = require('./api/routes/orders')

//prividing routes for http://localhost/products
app.use('/products', porductRoutes)

//prividing routes for http://localhost/orders
app.use("/orders", ordersRoutes)

module.exports = app 
