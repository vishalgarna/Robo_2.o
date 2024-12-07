const mongoose = require('mongoose');
const { db1 } = require('../config/db.config');

// Define Strategy Schema
const strategySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Users"

    },
    strategyName: {
        type: String,

    },
    timeframe : {
        type: String,
    },
    description: {
        type: String,

    },
    deployed: {
        type: Boolean,

    },
    // logicalOp: {
    //     type: String,
    // },

    indicators: [
        {
            name: {
                type: String,
            },
            type: {
                type: String,
            },
            parameters: {
                type: Object,
                of: mongoose.Schema.Types.Mixed,
            }
        }
    ],
    rules: [
        {
            condition: {
                type: String,
            },
            indicator: {
                type: String,
            },
            comparison: {
                type: String,
            },
            value: {
                type: mongoose.Schema.Types.Mixed,
            },
            action: {
                type: String,
            },
            logical_operator: {
                type: String,
            }
        }
    ],

    orderDetails : {
        orderType: {
            type : String
        },
        symbol : {
            type : String
        },
        volume : {
            type : Number,   
        },
        StopLoss : {
            type : Number,
        },
        TakeProfit : {
            type : Number
        }

    
    }
}, {
    timestamps: true // To track creation and update times 
});


const StrategiesModel = db1.model('Strategies', strategySchema);
module.exports = {StrategiesModel};

