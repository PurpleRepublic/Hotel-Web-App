const MongoClient = require('mongodb').MongoClient;
const dburl = "mongodb://localhost:27017";
let _connection = null;
 
const open = () => {
    MongoClient.connect(dburl,(err,db) => {
      if (err){   
        console.log("DB connection failed");
        return;
      }  
      _connection = db.db('MEANHotel');
      console.log("DB connection open", db);
    })
};
 
const get = () => {
    return _connection;
};
 
module.exports = {
    open : open,
    get : get
}; 