
const mongoose = require('mongoose');


const userSchema =  mongoose.Schema({
  uerName: {
      type: String,
      
  },
  userEmail: {
      type: String,
      required: true,
  },
  userPassword: {
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