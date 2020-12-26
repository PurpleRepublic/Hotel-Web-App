//hardcoded list of hotel data as json
const hotelData = require('../data/hotel-data.json');

//export controler functions
//responds with a slice of hotel data
module.exports.hotelgetALL = (req,res) => {
    console.log("GET the hotels");
    console.log(req.query);
    //use these values to slice hotel data aray
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
    
    var returnData = hotelData.slice(offset,offset + count);

    res
        .status(200)
        .json({ returnData });
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