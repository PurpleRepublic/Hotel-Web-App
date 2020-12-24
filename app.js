//initialize and declare 
var express = require('express');
var app = express();
var path = require('path')

//set propertis of the application
app.set('port', 3000);


//set up static middleware
//check to see if a route is matched by anyfiles in the public folder.
//if match deliver file to browser without adding extra routes. 
app.use(express.static(path.join(__dirname,'public')));


app.get('/json',function(_req,res){
    console.log("GET the homepage");

    res
        .status(200)
        .json({"jsonData":true});
});


app.get('/file',function(_req,res){
    console.log("GET the file");
 
    res
        .status(200)
        .sendFile(path.join(__dirname, 'app.js'));
});


var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log("Magic happens on port " + port);
});


