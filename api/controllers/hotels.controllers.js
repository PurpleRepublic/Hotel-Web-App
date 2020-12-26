//export a controler function

module.exports.hotelgetALL = (req,res) => {
    console.log("GET the json");
    res
        .status(200)
        .json({ "jsonData": true });
};