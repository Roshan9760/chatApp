const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Pls Provide The UserName"],
    },
    email: {
      type: String,
      require: [true, "Pls Provide The email id "],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Pls Provide The Password"],
    },
    profile_pic: {
      type: String,
      default:""
    },
  },
  { timestamps: true }
);


const Usermodel = mongoose.model('User',userSchema);
module.exports = Usermodel;