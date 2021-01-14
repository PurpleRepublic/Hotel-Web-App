const ObjectID = require('mongodb').ObjectID;
//Data from MongoDB Hotels collection
const dbconn = require('../data/dbconnections.js');
//hardcoded list of hotel data as json
const hotelData = require('../data/hotel-data.json');

//export controler functions
//responds with a slice of hotel data
module.exports.hotelgetALL = (req,res) => {
    const db = dbconn.get();
    const collection = db.collection('Hotels');

    var offset = 0;
    var count = 5;

    //is there a query?, is there an offset or count? 
    //take that and set it ass offset and count in our controler.
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    };

    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    };

    collection
        .find()
        .skip(offset)
        .limit(count)
        .toArray((err, docs) => {
            if(err){
            console.log("We found an error", err)
            }
            res
                .status(200)
                .json(docs)
        })
};

//paramterizes hotels and responds with one section of hotel data
module.exports.hotelgetONE = (req,res) => {
    const db = dbconn.get();
    const collection = db.collection('Hotels');

    const hotelID = req.params.hotelID;
    console.log("GET hotel ID: ", hotelID);

    collection
        .findOne({
            _id : ObjectID(hotelID)
        }, (err,docs) => {
            res
                .status(200)
                .json(docs);
        });
};

module.exports.hotelsAddOne = (req,res) => {
    const db = dbconn.get();
    const collection = db.collection('Hotels');
    var newHotel;

    if(req.body && req.body.stars && req.body.name){
        newHotel = req.body;
        newHotel.stars = parseInt(req.body.stars, 10);
        console.log("POST new hotel");
        
        collection.insertOne(newHotel,(err,response) => {
            console.log(response);
            console.log(response.ops);
            res
                .status(201)
                .json(response.ops);
        });
    }
    else {
        console.log("Required Data is Missing");
        res 
            .status(400)
            .json({message : "Required Data Missing from Body"});
    }
};