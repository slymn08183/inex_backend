const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {WarningConstants} = require("../util/Constants");

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
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/,
            WarningConstants.PROVIDE_VALID_PASSWORD
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    secret:{
        type: String,
        default:process.env.JWT_INTERNAL_SECRET_KEY
    }

});

UserSchema.methods.generateJswFromUser = function (){
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    const payload = {
        id: this._id,
        name: this.name,
        email: this.email,
        secret: this.secret
    }
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
}

UserSchema.pre("save", function(next){
    if(this.isModified("password")){
        bcrypt.genSalt(parseInt(process.env.BCRYPT_GEN_SALT_ROUNDS), (err, salt) => {
            if (err) next(err);
            bcrypt.hash(this.password, salt,(err, hash) => {
                if (err) next(err);
                this.password = hash;
                next();
            });
        });
    }
    else{
        next();
    }
});

module.exports = mongoose.model("User", UserSchema);