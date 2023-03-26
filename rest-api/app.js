const express = require("express")
const app = express()
const bodyPraser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv").config()
const cors=require('cors');
//parsing url encoded bodies. extendted: true allows to parse extended bodies with rich data in it.
app.use(bodyPraser.urlencoded({ extended: false }))
//parsing json.
app.use(bodyPraser.json())
app.use(cors())

//products related routes.
const porductRoutes = require("./api/routes/products")
//orders related routes.
const ordersRoutes = require("./api/routes/orders")

console.log(process.env.MONGO_ATLAS_PW);
mongoose
  .connect(
    "mongodb+srv://adarsh:" + process.env.MONGO_ATLAS_PW + "@cluster0.bsked4t.mongodb.net/firstdb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("success")
  })

//prividing routes for http://localhost/products
app.use("/products", porductRoutes)
// console.log("orders");
//prividing routes for http://localhost/orders
app.use("/orders", ordersRoutes)

//if all of the above mentioned routes do not exist we throw an error.
app.use((req, res, next) => {
  const error = Error("Not found")
  error.status = 404
  next(error)
})

//handling errors thrown by routes.
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

module.exports = app
