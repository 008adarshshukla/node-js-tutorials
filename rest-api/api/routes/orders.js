const express = require("express")
const router = express.Router()

//get request at http://localhost/orders
console.log("3");
router.get('/',(req, res) => {
    console.log("entered");
    try{
    res.status(200).json({
        message: "Orders were fetched."
    });
}
catch(e)
{
    res.status(400).send({
        e
    })
}
})

//post request at http://localhost/orders
router.post('/',(req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "Order was created.",
        order: order
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
