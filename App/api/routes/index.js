var express = require('express');
//instansiate router
var router = express.Router();
var ctrHotels = require("../controllers/hotels.controllers");

router
    .route('/hotels')
    .get(ctrHotels.hotelgetALL);

//route for hotel id parameter.
router
    .route('/hotels/:hotelID')
    .get(ctrHotels.hotelgetONE);

router
	.route('/hotels/test')
	.post(ctrHotels.hotelsAddOne);

//export the instatiated router
module.exports = router;