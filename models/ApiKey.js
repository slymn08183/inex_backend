const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {WarningConstants} = require("../util/Constants");
const {bcryptTheKey} = require("../helpers/crypt/crypt");

const ApiKeySchema = new Schema({

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
    secret:{
        type: String,
        default: process.env.JWT_INTERNAL_ADMIN_KEY
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ApiKeySchema.methods.generateJswFromUser = function (){
    const payload = {
        id: this._id,
        name: this.name,
        email: this.email,
        secret: this.secret
    }
    return jwt.sign(payload, process.env.JWT_ADMIN_KEY);
}

ApiKeySchema.pre("save", function(next){
    if(this.isModified("password")){
        bcryptTheKey(this, next);
    }
    else{
        next();
    }
});

module.exports = mongoose.model("ApiKey", ApiKeySchema);