const express = require('express');
//instansiate router
const router = express.Router();
const ctrHotels = require("../controllers/hotels.controllers.js");
const ctrReview = require("../controllers/reviews.controllers.js");

//HOTELS ROUTES//
//GET all hotels
router
    .route('/hotels')
    .get(ctrHotels.hotelgetALL)
    .post(ctrHotels.hotelsAddOne);

//route for hotel id parameter.
//GET one hotel
router
    .route('/hotels/:hotelID')
    .get(ctrHotels.hotelGetONE);
    
//REVIEWS ROUTES//
//GET all reviews for specific hotel//
//POST a review
router
    .route('/hotels/:hotelID/reviews')
    .get(ctrReview.reviewsGetAll)
    .post(ctrReview.reviewsAddOne)

//GET a specific review for a hotel
router
    .route('/hotels/:hotelID/reviews/:reviewID')
    .get(ctrReview.reviewsGetOne)

//export the instatiated router
module.exports = router;