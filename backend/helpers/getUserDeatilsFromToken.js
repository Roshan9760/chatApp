const jwt = require('jsonwebtoken');
const Usermodel = require('../models/UserModel');


const getUserDetailsFromToken = async (token)=>{

     if(!token){
         
         return {
               message:"Session Expired ",
               logout:true,
         }
     }

     // verify token 
     const decode =await  jwt.verify(token, process.env.JWT_SECERATE_TOKEN);

     // get user by id
     const user = await Usermodel.findById(decode.id)

    //  return response.status(200).json({
    //     message:"User Details ",
    //     data:user
    //  })
    return user
}

module.exports = getUserDetailsFromToken