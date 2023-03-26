const express = require("express")
const router = express.Router()
const Product = require("../models/product")
const mongoose = require("mongoose")

//get request at http://localhost/products
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id") //selcts the feilds to be fetched.
    .exec()
    .then((doc) => {
      console.log(doc)
      const response = {
        count: doc.length,
        products: doc.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products" + doc._id,
            },
          }
        }),
      }

      res.status(200).json(response)
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
        message: "Created product Successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products" + result._id,
          },
        },
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
    .select("name _id price")
    .exec()
    .then((doc) => {
      console.log(doc)
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            description: "Get all Products.",
            url: "http://localhost:3000/products",
          },
        })
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
      res.status(200).json({
        message: "Product Updated",
        request: {
          type: "GET",
          url: "http://locahost:3000/products" + id,
        },
      })
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
      res.send(200).json({
        message: "Product Deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: {
            name: "String",
            price: "Number",
          },
        },
      })
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
