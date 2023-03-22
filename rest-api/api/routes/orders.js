const express = require("express")
const router = express.Router()

//get request at http://localhost/orders
router.get('/',(req, res, next) => {
    res.status(200).json({
        message: "Orders were fetched."
    })
})

//post request at http://localhost/orders
router.post('/',(req, res, next) => {
    res.status(201).json({
        message: "Order was created."
    })
})

//get request at http://localhost/orders/orderId
router.get('/:orderId',(req, res, next) => {
    res.status(200).json({
        message: "Orders details fetched.",
        orderId: req.params.orderId
    })
})

//delete request at http://localhost/orders/orderId
router.delete('/:orderId',(req, res, next) => {
    res.status(200).json({
        message: "Orders deleted.",
        orderId: req.params.orderId
    })
})


module.exports = router