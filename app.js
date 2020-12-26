//initialize and declare 
const express = require('express');
const app = express();
const path = require('path');
const routes = require('./api/routes');

//set properties of the application
app.set('port', 3000);


//middleware that makes a consol log everytime a resource is requested from server
app.use((req,res, next) => {
    console.log(req.method, req.url);
    next();
});

//check to see if a route is matched by anyfiles in the public folder.
//if match deliver file to browser without adding extra routes. 
app.use(express.static(path.join(__dirname,'public')));

app.use('/',routes);

var server = app.listen(app.get('port'),() => {
    var port = server.address().port;
    console.log("Magic happens on port " + port);
});


