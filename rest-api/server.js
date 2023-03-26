const http = require("http")
const port = process.env.PORT || 3000
const app = require("./app")
const server = http.createServer(app)
// const server=require('express')();
server.listen(port, (req, res) => {
  console.log("started" + port)
})
