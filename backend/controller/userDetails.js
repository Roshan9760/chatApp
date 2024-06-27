const getUserDetailsFromToken = require("../helpers/getUserDeatilsFromToken");


async function UserDetails(request,response){

     try {
        

        const token = await request.cookies.token || "";

        const user = await getUserDetailsFromToken(token);

    return response.status(200).json({
            message:"User Details ",
            data:user
        })
     } catch (error) {
        
        return response.status(500).json({
          message: error.message || error,
          error:true
        });
     }
}

module.exports = UserDetails;