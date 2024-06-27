const mongoose = require('mongoose');


async  function connectDb(){

       try {
        
           await mongoose.connect(process.env.MONGO_URI);
           console.log("DB Connected Sucessfully !")
       } catch (error) {
        
           console.log("Error while Connecting with database ",error);
       }
}

module.exports = connectDb