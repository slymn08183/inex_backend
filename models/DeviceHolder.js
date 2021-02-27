const {WarningConstants} = require("../util/Constants");
const mongoose = require("mongoose");

const deviceHolder = new mongoose.Schema({
    deviceType:{
        type: String,
        required: [true, WarningConstants.DEVICE_TYPE]
    },
    deviceID:{
        type: String,
        required: [true, WarningConstants.DEVICE_ID]
    },
    lastChangedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = deviceHolder