const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

var runGeoQuery = (req, res) => {
    var lat = parseFloat(req.query.lat);
    var lng = parseFloat(req.query.lng);
    
};



//export controler functions
//responds with a slice of hotel data
module.exports.hotelgetALL = (req,res) => {

    var offset = 0;
    var count = 5;
    
    if(req.query && req.query.lat && req.query.lng){
        runGeoQuery(req, res);
        return;

    };

    //is there a query?, is there an offset or count? 
    //take that and set it ass offset and count in our controler.
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset,10);
    };

    if(req.query && req.query.count){
        count = parseInt(req.query.count,10);
    };

    Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec((err, hotels) => {
        console.log('Found Hotels ', hotels.length);
        res
            .json(hotels);
    });

};

//paramterizes hotels and responds with one section of hotel data
module.exports.hotelGetONE = (req,res) => {

    const hotelID = req.params.hotelID;
    console.log("GET hotel ID: ", hotelID);

    Hotel
        .findById(hotelID)
        .exec((err,docs) => {
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