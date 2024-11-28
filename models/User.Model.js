
const mongoose = require('mongoose');


const userSchema =  mongoose.Schema({
  UserName: {
      type: String,
      
  },
  UserEmail: {
      type: String,
      required: true,
  },
  UserPassword: {
      type: String,
      required: true,
  },
  
   accountNo : {

      type: Number  
    },

    accoutPass : {
      type : String
    },

    accountServer : {
      type : String
    }

}, {
  timestamps: true
}


)
const userModel = mongoose.model('Users',userSchema)

module.exports = {userModel};