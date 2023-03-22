const express = require('express')
const router = express.Router()

//get request at http://localhost/products
router.get('/',(req, res, next) => {
    res.status(200).json({
        message: "Handling get request to /products"
    })
})

//post request at http://localhost/products
router.post('/',(req, res, next) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json({
        message: "Handling post request to /products",
        createdProduct: product
    })
})

//get request at http://localhost/products/id
router.get('/:productId',(req, res, next) => {
    const id = req.params.productId
    if(id === 'special') {
        res.status(200).json({
            message: "You discovered a special id.",
            id: id
        })
    } else {
        res.status(200).json({
            message: "You passed an id"
        })
    }
})

//patch/update request at http://localhost/products/id
router.patch('/:productId',(req, res, next) => {
    res.status(200).json({
      message: "Updated the product",
    })
})

//delete request at http://localhost/products/id
router.delete('/:productId',(req, res, next) => {
    res.status(200).json({
      message: "Deleted the product",
    })
})

module.exports = router