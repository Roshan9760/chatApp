const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require: true,
    },
    messages: [
        {
        type: mongoose.Schema.ObjectId,
        ref:"message",
        
       }
     ],
  },
  { timestamps: true }
);

const conversationModel = mongoose.model("Conversation ", conversationSchema);
module.exports = conversationModel;
