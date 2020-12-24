//declaring express object from the node_modules folder
var express = require('express');
//initializing express object as app
var app = express();
//native node module lets us return files to browser through path
var path = require('path')
//set propertis of the application
app.set('port', 3000);

//chain a get method to app object to define rout request and response
//sends the index.html file we created to the homepage
app.get('/',function(req,res){
    console.log("GET the json");
    //chaining methods to response object returns 404 satus and a string
    //to the browser.
    res
        .status(200)
        //set path after __dirname as seperate strings to avoid 
        .sendFile(path.join(__dirname,'public','index.html'));
});

//sends a json data back to browser
app.get('/json',function(req,res){
    console.log("GET the homepage");
    //chaining methods to response object returns 404 satus and a string
    //to the browser.
    res
        .status(200)
        .json({"jsonData":true});
});

//sends a file to localhost:3000/file
app.get('/file',function(req,res){
    console.log("GET the file");
    //chaining methods to response object returns 404 satus and a string
    //to the browser.
    res
        .status(200)
        //join joins multiple arguments for file path. first is current directory, second pass in app.js file to browser
        .sendFile(path.join(__dirname, 'app.js'));
});

//first get express to listen for requests on port 3000
//notice then when ran from cmd line that it doesn't stop. 
//It's running continuously because the server is still listening
//app.listen  => (port, callback function) returns object
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log("Magic happens on port " + port);
});


