var express = require('express');
//instansiate router
var router = express.Router();
var ctrHotels = require("../controllers/hotels.controllers");

router
    .route('/hotels')
    .get(ctrHotels.hotelgetALL);
//export the instatiated router
module.exports = router;