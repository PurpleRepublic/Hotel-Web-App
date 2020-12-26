//hardcoded list of hotel data as json
const hotelData = require('../data/hotel-data.json');

//export controler functions
module.exports.hotelgetALL = (req,res) => {
    console.log("GET the hotels");
    res
        .status(200)
        .json({ hotelData });
};

module.exports.hotelgetONE = (req,res) => {
    const hotelID = req.params.hotelID;
    const thisHotel = hotelData[hotelID];
    console.log("GET hotel ID: ", hotelID);
    res
        .status(200)
        .json({ thisHotel });
};