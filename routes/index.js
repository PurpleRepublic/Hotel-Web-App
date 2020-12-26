var express = require('express');
//instansiate router
var router = express.Router();

router
    .route('/json')
    .get(function (_req, res) {
            console.log("GET the json");
            res
                .status(200)
                .json({ "jsonData": true });
        })
    .post(function (_req, res) {
            console.log("POST the json route");
            res
                .status(200)
                .json({ "jsonData": "POST recieved" });
        });

//export the instatiated router
module.exports = router;