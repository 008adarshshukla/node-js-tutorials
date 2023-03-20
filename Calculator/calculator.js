const express = require("express")
const bodyParser = require("body-parser");
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }));

app.get('^/$|/index.html', (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get("/new_page(.html)?", (req, res) => {
  res.status(404).sendFile(__dirname + "/new_page.html");
});
//Note = express handles these routes like waterfall, as soon as it satisfy some condition we use the route under that condition hence we can handle all other routes at the very bottom.

//redirect using express.
app.get("/old_page(.html)?", (req, res) => {
  res.redirect(301, '/new_page.html');
  //here 301 is status code for the redirect if not found defaults to status code 302 "Found"
  //302 -- temporary redirection.
  //301 -- permanent redirection.
});

//Rote handlers and its chaining.
app.get('/hello(.html)?',(req,res,next) => {
  console.log('attempted to load hello.html');
  next()
}, (req, res) => {
  res.send("Hello chutiyon")
})

//another method to chain routes.
const one = (req,res,next) => {
  console.log('one');
  next()
}

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res) => {
  console.log("three");
  res.send("Finished!!!")
};

app.get('/chain(.html)?', [one, two, three])

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'))
})

//handles the post request.
app.post("/", (req, res) => {
  console.log(req.body);
  //body parser parses in form of string.
  var num1 = Number(req.body.num1);
  


  var num2 = Number(req.body.num2);

  var result = num1 + num2;
  res.send(`The result of addition of two numbers is = ${result}`);
});

app.listen(3000, () => {
  console.log("listening at port 3000");
});