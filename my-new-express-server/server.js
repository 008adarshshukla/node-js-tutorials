const express = require('express')
//it return a function 
// app is the call to the returned function.
const app = express()

//Note-"localhost:3000" is the home route of the website. it isequivalant to "localhost:3000/" or "/". When we load up the website(route) the browser sends up the 'get' request to server to get some data for it. The server then sends a response to the browser. The reponse includes the html, css, javascript to render the website.

//the request is the request sent to server by the browser.
app.get("/",(request, response) => {
    //console.log(request);
    response.send("Hello")
})

//with listen function we can specify a port and also have a callback function.
app.listen(3000, () => {
    console.log('server running at port 3000');
})

