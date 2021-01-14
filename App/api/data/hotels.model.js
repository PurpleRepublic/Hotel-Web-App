//Holds Hotel data schema, exported as a data model 
const mongoose = require('Mongoose');

var hotelSchema = new mongoose.schema({
    name : {
        type : String,
        required : true,
    },
    stars : {
       type : Number,
       min : 0,
       max : 5,
       default : 0
    },
    services : [String],
    description : String,
    photos : [String],
    currency : String
});

mongoose.model('Hotel', hotelSchema, Hotels)