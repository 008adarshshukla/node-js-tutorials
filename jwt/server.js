const express = require('express')
const path = require ('path')
const bodyParser = require("body-parser")

const PORT = process.env.PORT || 3000

const app = express()
const verifyJWT = require("./controllers/middleware/verifyJWT")
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//middleware for cookies
app.use(cookieParser())

//middleware to serve the static files.
app.use('/', express.static(path.join(__dirname, "/public")))
//serving static files for /subdir
app.use('/subdir', express.static(path.join(__dirname, "/public")));

//providing the router for http://localhost/subdir
app.use('/subdir', require('./routes/subdirRoutes'))
//Note here the first parameter is the route for which we are providing the router for, and second parameter is importing the router file.

//provideing routes user registration.
app.use('/register', require('./routes/api/register'))

//providing route for user login
app.use("/auth", require("./routes/api/auth"))

//providing refresh route before the verify jwt.
app.use("/refresh", require("./routes/api/refresh"))

//providing logout route
app.use("/logout", require("./routes/api/logout"))


//putting verifyJWT middleware here so all the request after this will require to verify jwt.
app.use(verifyJWT)

//providing router for http://localhost/employees
app.use('/employees', require('./routes/api/employees'))

app.get('^/$|index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, 'Views', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server started on  port`);
});

/*
require('crypto').randomBytes(64).toString('hex')
THis genertaes the access token.
*/