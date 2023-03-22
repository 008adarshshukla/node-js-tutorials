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

//if all of the above mentioned routes do not exist we throw an error.
app.use((req, res, next) => {
    const error = Error('Not found')
    error.status = 404
    next(error)
})

//handling errors thrown by routes.
app.use((error, req, res, next) => {
    res.status(error.status || 500)
     res.json({
        error: {
            message: error.message
        }
     })
})

module.exports = app 
