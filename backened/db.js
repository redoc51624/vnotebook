const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/vnotebook";

// const connectToMongo = () => {
//     mongoose.connect(mongoURI,()=>{
//         console.log("Connected to mongo successfully");
//     })
// }

const connectToMongo = () => {
    mongoose.connect(mongoURI);
  };
  
  console.log("Connected to Mongo Successfully");

module.exports = connectToMongo;