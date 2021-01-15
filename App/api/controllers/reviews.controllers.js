const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

//GET all reviews for a hotel
module.exports.reviewsGetAll = (req, res) => {
    const hotelID = req.params.hotelID;
    console.log("GET hotelID: ", hotelID);

    Hotel
        .findById(hotelID)
        .select('reviews')
        .exec((err,docs) => {
            if(err){
                res
                    .status(500)
                    .json(err)
            }
            res
                .status(200)
                .json(docs.reviews);
        });
};
//GET a single review for a hotel
module.exports.reviewsGetOne = (req, res) => {
    const hotelID = req.params.hotelID;
    const reviewID = req.params.reviewID;
    console.log("GET review ID " + reviewID + "for hotel ID " + hotelID);

    Hotel
        .findById(hotelID)
        .select('reviews')
        .exec((err,hotel) => {
            const isValid = mongoose.Types.ObjectId.isValid(reviewID);
            const review = hotel.reviews.id(reviewID);

            var response = {
                status : 200,
                message : review
            }
            if(!isValid){
                response.status = 404;
                response.message = {"message" : "Cant find this review ID"};
            }
            else if(err){
                response.status = 500; 
                response.message = err;
            }
            res
                .status(response.status)
                .json(response.message);
        });
};