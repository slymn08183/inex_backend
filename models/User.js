const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const jwt = require("jsonwebtoken");
const {WarningConstants} = require("../util/Constants");
const {bcryptTheKey} = require("../helpers/crypt/crypt")
//const deviceHolder = require("../models/DeviceHolder")

const deviceHolder = new mongoose.Schema({

})

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, WarningConstants.PROVIDE_NAME]
    },
    email:{
        type: String,
        required: [true, WarningConstants.PROVIDE_EMAIL],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            WarningConstants.PROVIDE_VALID_EMAIL
        ]
    },
    password:{
        type: String,
        minlength: [process.env.PASSWORD_MIN_LENGTH, WarningConstants.PASSWORD_MIN_LENGTH],
        maxlength: [process.env.PASSWORD_MAX_LENGTH, WarningConstants.PASSWORD_MAX_LENGTH],
        required: [true, WarningConstants.PROVIDE_PASSWORD],
        select: false,
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,1024}$/,
            WarningConstants.PROVIDE_VALID_PASSWORD
        ]
    },
    devices:[
        {
            deviceType: {
                type: String,
                required: [true, WarningConstants.DEVICE_TYPE]
            },
            deviceToken: {
                type: String,
                required: [true, WarningConstants.DEVICE_ID]
            },
            lastChangedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    lastChangedAt:{
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    secret:{
        type: String,
        default:process.env.JWT_INTERNAL_SECRET_KEY,
    },
    isBanned:{
        type: Boolean,
        default: false
    }
});

UserSchema.methods.generateJswFromUser = function (){
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    const payload = {
        id: this._id,
        name: this.name,
        email: this.email,
        lastChangedAt: this.lastChangedAt,
        secret: this.secret
    }
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
}

UserSchema.pre("save", function(next){
    if(this.isModified("password")){
        bcryptTheKey(this, next);
    }
    else{
        next();
    }
});


module.exports = mongoose.model("User", UserSchema);