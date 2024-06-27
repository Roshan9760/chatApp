const Usermodel = require("../models/UserModel");
const bcryptjs = require('bcryptjs')
async function registerUser (request,response){

     
       try {
        
           const {name,email,password,profile_pic} =request.body;

           const checkEmail = await Usermodel.findOne({email});

           if(checkEmail){
              
               return response.status(400).json({
                   message:"Already user exists ! Pls Login ",
                   error:true
               })
           }

           // hash the password
           const salt = await bcryptjs.genSalt(10);
           const hashPassword = await bcryptjs.hash(password,salt);

           const payload ={
            name,
            email,
            profile_pic,
            password:hashPassword
           }

           const user = new Usermodel(payload);
           const usersave = await user.save();

           return response.status(201).json({
               message:"User Register Sucessfully !",
               data:usersave,
               success:true,
           })


       } catch (error) {
           
          return response.status(500).json({
            message:error.message || error,
            error:true
          })
       }
}

module.exports = registerUser