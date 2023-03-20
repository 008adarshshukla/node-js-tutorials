console.log("hello workd")
// importing a core module
const os = require('os')
const path = require('path')

//importing user defined modules
const math = require('./math')

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

//getting directory name
console.log(__dirname)
//getting file name
console.log(__filename)

//getting directory name as path
console.log(path.dirname(__filename))

//getting the base name(file name) at the path
console.log(path.basename(__filename))

//getting the extension of the file at the path
console.log(path.extname(__filename))

//parsing the path of the file into individual components.
console.log(path.parse(__filename))

console.log(math.add(2,3))
