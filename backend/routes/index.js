const express = require('express');
const registerUser = require('../controller/registerUser');
const checkEmail = require('../controller/checkEmail');
const checkPassword = require('../controller/checkPassword');
const UserDetails = require('../controller/userDetails');
const logout = require('../controller/logout');
const updateUserDetails = require('../controller/updateUserDetails');



const router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// api routes
router.post('/register',registerUser)
router.post('/email',checkEmail) // for verify eamil 
router.post('/password',checkPassword) // for verify the password
router.get('/user-details',UserDetails) // tp get user details
router.post('/logout',logout) // logout 
router.post("/updated-user",updateUserDetails); // update user details

// export
module.exports = router