const { response } = require("express");
const Usermodel = require("../models/UserModel");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function checkPassword(request,response){

     try {
        

         const {password,UserId} = request.body;

         // get ele by id
         
         const user = await Usermodel.findById(UserId);
         
         // not a user 
         if(!user){
            return response.status(400).json({
            message: "User Not Exist ",
            });
         }
         // decode the password
         const verifyPassword = await bcryptjs.compare(password,user.password);

         if(!verifyPassword){
            return response.status(400).json({
                message:"Pls Provide Correct password "
            })
         }
         
       
         // make token
         const tokenData = {
            id:user._id,
            email:user.email
         }

         const token = await jwt.sign(tokenData,process.env.JWT_SECERATE_TOKEN,{expiresIn:'1d'});

         const cookieOptions = {
            http:true,
            secure:true
         }

         return response.cookie('token',token,cookieOptions).status(200).json({
            message:"Login Successfully ",
            token:token,
            success:true
         })

     } catch (error) {
        
         return response.status(500).json({
            message:error.message || error,
            error:true
         })
     }
}

module.exports = checkPassword;