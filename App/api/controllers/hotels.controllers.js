const dbconn = require('../data/dbconnections.js');
//hardcoded list of hotel data as json
const hotelData = require('../data/hotel-data.json');

//export controler functions
//responds with a slice of hotel data
module.exports.hotelgetALL = (req,res) => {
    var db = dbconn.get();
    var collection = db.collection('Hotels');

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
    const hotelID = req.params.hotelID;
    const thisHotel = hotelData[hotelID];
    console.log("GET hotel ID: ", hotelID);
    res
        .status(200)
        .json({ thisHotel });
};

module.exports.hotelsAddOne = (req,res) => {
    console.log("POST new hotel");
    console.log(req.body);
    res
        .status(200)
        .json(req.body);

};