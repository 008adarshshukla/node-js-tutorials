const express = require("express")
const app = express()
const bodyPraser = require('body-parser')
const mongoose = require('mongoose')

//parsing url encoded bodies. extendted: true allows to parse extended bodies with rich data in it.
app.use(bodyPraser.urlencoded({extended: false}))
//parsing json.
app.use(bodyPraser.json())

//products related routes.
const porductRoutes = require('./api/routes/products')
//orders related routes.
const ordersRoutes = require('./api/routes/orders')

mongoose.connect(
  "mongodb+srv://shuklaadarsh1932:" + process.env.MONGO_ATLAS_PW + "@cluster0.bsked4t.mongodb.net/?retryWrites=true&w=majority",{
    useMongoClient: true
  })

//hnadling CORS error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Origin","Origin, X-Requested-With, Content-Type, Accept, Authorization")

    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Origin", 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
})

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
