const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: Number, required: true },
  price: { type: Number, required: true },
})

module.exports = mongoose.model("Product", productSchema)

/*
Note =
Sending an extra arguement other that those defined in schema in request body leads to valid request but does not add the extra property in db.
*/
