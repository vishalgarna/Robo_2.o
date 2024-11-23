
const mongoose = require('mongoose');

const UserModel = mongoose.model('Users', mongoose.Schema({
    UserName: {
        type: String,
        
    },
    UserEmail: {
        type: String,
        required: true,
        unique: true,
    },
    UserPassword: {
        type: String,
        required: true,
    },
    brokerAccount :[ {
      accountNo : {

        type: Number  
      },

      accoutPass : {
        type : String
      },

      accountServer : {
        type : String
      }

    }],
    UserStrategies: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Strategies'

    }]
}, {
    timestamps: true
}


))

module.exports = UserModel;