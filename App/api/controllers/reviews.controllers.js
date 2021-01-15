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
            const review = hotel.reviews.id(reviewID);
            res
                .status(200)
                .json(review);
        });
};

