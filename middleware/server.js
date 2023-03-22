/*
Middleware gets executed after the server receives the request and before the controller actions send the response. Middleware has the access to the request object, responses object, and next, it can process the request before the server send a response

Middleware functions can perform the following tasks:

1.Execute any code.
2.Make changes to the request and the response objects.
3.End the request-response cycle.
4.Call the next middleware function in the stack.


*/

/*
https://stackoverflow.com/questions/58925276/what-is-the-difference-between-a-route-handler-and-middleware-function-in-expres#:~:text=They%20are%20not%20middleware%20functions,calls%20the%20next%20middleware%20function.

*/

//Three types of middleware -
//1. Built in
//2. Custom
//3. Built in

const express = require("express");
const app = express();
const path = require("path");
const {logger} = require('./middleware_folder/logEvents')
const cors = require('cors')

const PORT = process.env.PORT || 3000;

//custom middlpeware logger
app.use(logger);

//Cross origin resource sharing. (CORS)
//whitelist contains the domains that can access the backend server
const whitelist = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3000' ]
const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) != -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

//for handling url encoded data/form data.
//It parses incoming requests with urlencoded payloads and is based on body-parser.

app.use(express.urlencoded({ extended: false }));

//This is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());

//server the static files.
//it is a built-in middleware function in Express. It serves static files and is based on serve-static.
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send(err.message)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
