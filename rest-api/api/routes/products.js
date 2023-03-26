const express = require("express")
const router = express.Router()
const Product = require("../models/product")
const mongoose = require("mongoose")

//get request at http://localhost/products
router.get("/", (req, res, next) => {
  Product.find()
    .exec()
    .then((doc) => {
      console.log(doc)
      res.status(200).json(doc)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

//post request at http://localhost/products
router.post("/", (req, res, next) => {
  //creating the product model
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  })
  //saving the product model.
  product
    .save()
    .then((result) => {
      console.log(result)
      res.status(200).json({
        message: "Handling post request to /products",
        createdProduct: result,
      })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

//get request at http://localhost/products/id
//Note - If the id is invalid then the error is returned. If the id is  valid but it does not exist in database then 'null' is returned.
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({
          message: "No valid entry found for provided Id.",
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

//patch/update request at http://localhost/products/id
router.patch("/:productId", (req, res, next) => {
  const id = req.params.productId
  //checking what properties are present in body and updating only those.
  const updateOptions = {}
  for (const option of req.body) {
    updateOptions[option.propName] = option.value
  }
  Product.findByIdAndUpdate(
    { _id: id },
    {
      $set: updateOptions,
    }
  )
    .exec()
    .then((result) => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

//delete request at http://localhost/products/id
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId
  Product.findOneAndRemove({ _id: id })
    .exec()
    .then((result) => {
      res.send(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

module.exports = router


/*
Case Iterable properties for patch request.
[
    {"propName": "name", "value": "Harry Potter Changed"}
]
*/