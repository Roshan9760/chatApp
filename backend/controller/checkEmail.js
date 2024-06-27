const Usermodel = require("../models/UserModel");


async function checkEmail(request,response){
    
      try {
        
        const {email} = request.body;

        const checkemail = await Usermodel.findOne({email});

        if(!checkemail){
            return response.status(400).json({
                message:"User Not Exist ! Pls Register First",
                error:true
            })
        }

        return response.status(200).json({
            message:"email verify",
            success:true,
            data:checkemail
        })


      } catch (error) {
        
           return response.status(500).json({
            message:error.message || error,
            error:true
          })
      }
}

module.exports = checkEmail;