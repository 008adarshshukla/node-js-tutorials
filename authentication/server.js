const express = require('express')
const path = require ('path')
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//middleware to serve the static files.
app.use('/', express.static(path.join(__dirname, "/public")))
//serving static files for /subdir
app.use('/subdir', express.static(path.join(__dirname, "/public")));

//providing the router for http://localhost/subdir
app.use('/subdir', require('./routes/subdirRoutes'))
//Note here the first parameter is the route for which we are providing the router for, and second parameter is importing the router file.

//providing router for http://localhost/employees
app.use('/employees', require('./routes/api/employees'))

//provideing routes user registration.
app.use('/register', require('./routes/api/register'))

//providing route for user login
app.use("/auth", require("./routes/api/auth"))

app.get('^/$|index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, 'Views', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server started on  port`);
});