
const mongoose = require('mongoose');

const forexdataSchema = mongoose.Schema({

    symbol: {
        type: String
    },
    data15m: [{
        time: {
            type: Number


        },
        open: {
            type: Number


        },
        high: {
            type: Number


        },
        low: {
            type: Number


        },
        close: {
            type: Number

        },

    }],

    data5m: [{
        time: {
            type: Number


        },
        open: {
            type: Number


        },
        high: {
            type: Number


        },
        low: {
            type: Number


        },
        close: {
            type: Number

        },

    }],

    data1m: [{
        time: {
            type: Number


        },
        open: {
            type: Number


        },
        high: {
            type: Number


        },
        low: {
            type: Number


        },
        close: {
            type: Number

        },

    }],
}
    , { timstamps: true })

const ForexDataModel = mongoose.model('ForexData', forexdataSchema)

module.exports = { ForexDataModel };