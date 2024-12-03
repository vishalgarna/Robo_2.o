
const mongoose = require('mongoose');
const { db1 } = require('../config/db.config');


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
const userModel = db1.model('Users',userSchema)

module.exports = {userModel};