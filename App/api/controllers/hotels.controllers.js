const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

//take lng and lat query values and return hotesl withing
//2000m of that geo location
var runGeoQuery = (req, res) => {
    var lat = parseFloat(req.query.lat);
    var lng = parseFloat(req.query.lng);

    Hotel
        .aggregate([
        {
            $geoNear : {
            near : { type : "Point", coordinates : [lng, lat]},
            distanceField : "dist.calculated",
            spherical : true,
            maxDistance : 2000,
            }
        },
        {$limit : 5}
        ],(err, results, stats) => {
            if(err){
                res
                    .status(500)
                    .json(err)
            }
            console.log('Geo results ', results);
            res
              .status(200)
              .json(results);
          }
        )
};


//responds with a slice of hotel data
module.exports.hotelgetALL = (req,res) => {

    var offset = 0;
    var count = 5;
    const maxCount = 10;

    //if offset or count isn't a number return
    
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
    //error trapping - offset & count should be numbers
    if(isNaN(offset) || isNaN(count)){
        res
            .status(400)
            .json({
                "message" : "If supplied in query string, count & offset should be numbers"
            });
        return;
    };
    if(count > maxCount){
        res
            .status(400)
            .json({
                "message" : "count limit of " + maxCount + " exceded."
            });
        return;
    }

    Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec((err, hotels) => {
        if(err){
            res
                .status(500)
                .json(err)
        }
        else{
        console.log('Found Hotels ', hotels.length);
        res
            .json(hotels);
        }
    });

};

//paramterizes hotels and responds with one section of hotel data
module.exports.hotelGetONE = (req,res) => {

    const hotelID = req.params.hotelID;
    console.log("GET hotel ID: ", hotelID);

    Hotel
        .findById(hotelID)
        .exec((err,doc) => {
            //need new way to validate ObjectID's this doesn't matter if its correct
            //or incorrect format. It's unabel to distinguish 404 and 400 errors
            var isValid = mongoose.Types.ObjectId.isValid(hotelID);
            var response = {
                status : 200,
                message : doc
            }
            if(!isValid){
                response.status = 404;
                response.message = {"message" : "Hotel ID not found"}
            }
            else if(err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }
            res
                .status(response.status)
                .json(response.message);
            });
};

//helper method to split array
var _splitArray = (input) => {
    var output;
    if(input && input.length > 0){
        output = input.split(";");
        return output
    }
    output = [];
    return output;
 }

module.exports.hotelsAddOne = (req,res) => {
    Hotel
        .create({
            name : req.body.name,
            description : req.body.description,
            stars : parseInt(req.body.stars,10),
            services : _splitArray(req.body.services),
            photos : _splitArray(req.body.photos),
            currency : req.body.currency,
            location : {
                address : req.body.address,
                coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
            }
        },(err,hotel) => {
            if(err){
                res
                    .status(400)
                    .json(err)
            }
            console.log("Hotel created ", hotel);
            res 
                //resource has been created 201
                .status(201)
                .res(hotel)

        });
};

module.exports.hotelUpdateONE = (req,res) => { 
    const hotelID = req.params.hotelID;
    console.log("GET hotel ID: ", hotelID);

    Hotel
        .findById(hotelID)
        //exclude reviews and rooms
        .select("-reviews -rooms")
        .exec((err,doc) => {
            //need new way to validate ObjectID's this doesn't matter if its correct
            //or incorrect format. It's unabel to distinguish 404 and 400 errors
            var isValid = mongoose.Types.ObjectId.isValid(hotelID);
            var response = {
                status : 200,
                message : doc
            }
            if(!isValid){
                response.status = 404;
                response.message = {"message" : "Hotel ID not found"}
            }
            else if(err){
                console.log("Error finding hotel");
                response.status = 500;
                response.message = err;
            }
            if(response.status != 200){
            res
                .status(response.status)
                .json(response.message);
            }
            else{
                doc.name = req.body.name,
                doc.description = req.body.description,
                doc.stars = parseInt(req.body.stars,10),
                doc.services = _splitArray(req.body.services),
                doc.photos = _splitArray(req.body.photos),
                doc.currency = req.body.currency,
                doc.location = {
                    address : req.body.address,
                    coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
                };
            doc.save((err,updatedHotel) => {
                if(err){
                    res
                        .status(500)
                        .json(err)
                }
                else{
                    res
                        .status(204)
                        .json()
                }
            });
            }
        })
};


module.exports.hotelDeleteONE = (req,res) => {
    const hotleID = req.params.hotelID;
    Hotel
        .findByIdAndRemove(hotelID)
        .exec((err,hotel) => {
            if(err){
                res
                    .status(404)
                    .json(err)
            }
            console.log("Hotel ",hotelID, " has been deleted");
            res
                .status(204)
                .json()
        })
}