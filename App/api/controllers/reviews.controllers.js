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
    console.log("GET review ID " + reviewID + " for hotel ID " + hotelID);

    Hotel
        .findById(hotelID)
        .select('reviews')
        .exec((err,hotel) => {
            //need new way to validate ObjectID's this doesn't matter if its correct
            //or incorrect format. It's unabel to distinguish 404 and 400 errors
            const isValid = mongoose.Types.ObjectId.isValid(reviewID);
            const review = hotel.reviews.id(reviewID);

            var response = {
                status : 200,
                message : []
            }
            if(!isValid){
                response.status = 404;
                response.message = {"message" : "Cant find this review ID"};
            }
            else if(err){
                response.status = 500; 
                response.message = err;
            }
            else{
                response.message = hotel.reviews ? hotel.reviews : [];
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

var _addReview = (req,res, hotel) => {
    hotel.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating),
        review : req.body.review
    })
    hotel.save((err, hotelUpdated) => {
        if(err){
            res 
                .status(500)
                .json(err)
        }
        res 
            .status(201)
            //returns last review added not whole hotel document
            .json(hotelUpdated.reviews([hotelUptdated.reviews.length - 1]))
    })
};

module.exports.reviewsAddOne = (req,res) => {
    const hotelID = req.params.hotelID;
    console.log("GET hotelID: ", hotelID);

    Hotel
        .findById(hotelID)
        .select('reviews')
        .exec((err,hotel) => {
            const review = hotel.reviews.id(reviewID);

            var response = {
                status : 200,
                message : []
            }
            if(!hotel){
                response.status = 404;
                response.message = {"message" : "Cant find this review ID"};
            }
            else if(err){
                response.status = 500; 
                response.message = err;
            }
            if(hotel){
                _addReview(req, res, doc)
            }
            else{
                res
                    .status(response.status)
                    .json(response.message);
            }
        });
};

module.exports.reviewsUpdateOne = function(req, res) {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('PUT reviewId ' + reviewId + ' for hotelId ' + hotelId);
  
    Hotel
      .findById(hotelId)
      .select('reviews')
      .exec(function(err, hotel) {
        var thisReview;
        var response = {
          status : 200,
          message : {}
        };
        if (err) {
          console.log("Error finding hotel");
          response.status = 500;
          response.message = err;
        } else if(!hotel) {
          console.log("Hotel id not found in database", id);
          response.status = 404;
          response.message = {
            "message" : "Hotel ID not found " + id
          };
        } else {
          // Get the review
          thisReview = hotel.reviews.id(reviewId);
          // If the review doesn't exist Mongoose returns null
          if (!thisReview) {
            response.status = 404;
            response.message = {
              "message" : "Review ID not found " + reviewId
            };
          }
        }
        if (response.status !== 200) {
          res
            .status(response.status)
            .json(response.message);
        } else {
          thisReview.name = req.body.name;
          thisReview.rating = parseInt(req.body.rating, 10);
          thisReview.review = req.body.review;
          hotel.save(function(err, hotelUpdated) {
            if (err) {
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(204)
                .json();
            }
          });
        }
      });
  
  };
module.exports.reviewsDeleteOne = (req,res) => {
    var hotelId = req.params.hotelId;
    var reviewId = req.params.reviewId;
    console.log('Delete reviewId ' + reviewId + ' for hotelId ' + hotelId);
  
    Hotel
      .findById(hotelId)
      .select('reviews')
      .exec(function(err, hotel) {
        var thisReview;
        var response = {
          status : 200,
          message : {}
        };
        if (err) {
          console.log("Error finding hotel");
          response.status = 500;
          response.message = err;
        } else if(!hotel) {
          console.log("Hotel id not found in database", id);
          response.status = 404;
          response.message = {
            "message" : "Hotel ID not found " + id
          };
        } else {
          // Get the review
          thisReview = hotel.reviews.id(reviewId);
          // If the review doesn't exist Mongoose returns null
          if (!thisReview) {
            response.status = 404;
            response.message = {
              "message" : "Review ID not found " + reviewId
            };
          }
        }
        if (response.status !== 200) {
          res
            .status(response.status)
            .json(response.message);
        } else {
          hotel.reviews.id(reviewID).remove()
          hotel.save((err, hotelUpdated) => {
            if (err) {
              res
                .status(500)
                .json(err);
            } else {
              res
                .status(204)
                .json();
            }
          });
        }
      });
  
}