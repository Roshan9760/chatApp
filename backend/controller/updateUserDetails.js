const Usermodel = require("../models/UserModel");

async function updateUserDetails(request,response){
     
       try {
         
           const token = await request.cookies.token || "";

           const user = await getUserDetailsFromToken(token);

           // get updated details
           const {name,profile_pic} =request.body;

           // get the details of user
           const updatedUser = await Usermodel.updateOne({_id:user._id},{
              name,
              profile_pic
           })

           const updatedUserInfo = await Usermodel.findById(user._id);

            return response.status(200).json({
              message: "User Details Updated Sucessfully !",
              date:updatedUserInfo,
              success:true
            });


       } catch (error) {
          
             return response.status(500).json({
               message: error.message || error,
               error: true,
             });
       }
}

module.exports = updateUserDetails