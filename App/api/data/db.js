const mongoose = require('mongoose');
const dburl = "mongodb://localhost:27017/MEANHotel";

mongoose.connect(dburl, { useNewUrlParser: true }, { useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dburl);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

//caputure event of control + c terminating app --UNIX//
process.on('SIGINT', () =>{
    mongoose.connection.close(()=>{
        console.log('Mongoose diconected through app termination (SIGINT)');
        process.exit(0);
    });
});
//caputre event of disconection of platform service providers.
process.on('SIGTERM', () =>{
    mongoose.connection.close(()=>{
        console.log('Mongoose diconected through app termination (SIGTERM)');
        process.exit(0);
    });
});
//caputer event of restarting nodemon.
process.once('SIGUSR2', () =>{
    mongoose.connection.close(()=>{
        console.log('Mongoose diconected through app termination (SIGUSR2)');
        process.kill(process.pid, 'SIGUSR2');
    });
});

//BRING IN SCHEMA AND MODELS
require('./hotels.model.js');