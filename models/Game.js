const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {WarningConstants, DatabaseConstants} = require("../util/Constants");

const UserSchema = new Schema({

    [DatabaseConstants.GAME]: {
        [DatabaseConstants.GAME_NAME]:{
            type: String,
            required: [true, WarningConstants.PROVIDE_NAME],
            unique: true
        },
        [DatabaseConstants.GAME_THUMBNAIL]:{
            type: String,
        },
        [DatabaseConstants.GAME_RELEASE_DATE]:{
            type: String //FIXME arrange format
        }
    },
    [DatabaseConstants.GAME_DEVELOPERS]:{
      type: Array
    },
    [DatabaseConstants.GAME_VIDEOS]:{
        type: Array
    },
    [DatabaseConstants.GAME_GENRES]:{
        type: Array
    },
    [DatabaseConstants.GAME_FEATURES]:{
        type: Array
    },
    [DatabaseConstants.GAME_DESCRIPTION]:{
        [DatabaseConstants.GAME_SHORT_DESCRIPTION]:{
            type: String,
            maxlength: [process.env.DESCRIPTION_MAX_LENGTH, WarningConstants.DESCRIPTION_MAX_LENGTH]
        },
        [DatabaseConstants.GAME_LONG_DESCRIPTION]:{
            type: String,
            maxlength: [process.env.DESCRIPTION_MAX_LENGTH, WarningConstants.DESCRIPTION_MAX_LENGTH]
        }
    },
    [DatabaseConstants.GAME_SPECS]:{
        [DatabaseConstants.GAME_MIN_SPECS]:{
            type: String,
            maxlength: [process.env.DESCRIPTION_MAX_LENGTH, WarningConstants.DESCRIPTION_MAX_LENGTH]
        },
        [DatabaseConstants.GAME_REC_SPECS]:{
            type: String,
            maxlength: [process.env.DESCRIPTION_MAX_LENGTH, WarningConstants.DESCRIPTION_MAX_LENGTH]
        }
    },
    [DatabaseConstants.GAME_STORES]:{
        [DatabaseConstants.GAME_NAME]:{
            type: String,
            //required: [true, WarningConstants.PROVIDE_NAME],
        },
        [DatabaseConstants.GAME_URL]:{
            type: String,
            //required: [true, WarningConstants.PROVIDE_NAME],
        },
        [DatabaseConstants.GAME_DISCOUNT_PRICE]:{
            type: String,
            //required: [true, WarningConstants.PROVIDE_VALID_PRICE_VALUES],
        },
        [DatabaseConstants.GAME_ORIGINAL_PRICE]:{
            type: String,
            //required: [true, WarningConstants.PROVIDE_VALID_PRICE_VALUES],
        },
        [DatabaseConstants.GAME_DISCOUNT_PRICE_FMT]:{
            type: String,
            //required: [true, WarningConstants.PROVIDE_VALID_PRICE_VALUES],
        },
        [DatabaseConstants.GAME_ORIGINAL_PRICE_FMT]:{
            type: String,
            //required: [true, WarningConstants.PROVIDE_VALID_PRICE_VALUES],
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.generateJswFromUser = function (){
    const {JWT_SECRET_KEY, JWT_EXPIRE} = process.env;
    const payload = {
        id: this._id,
        name: this.name
    }
    return jwt.sign(payload, JWT_SECRET_KEY, {
        expiresIn: JWT_EXPIRE
    });
}

module.exports = function (collection_language){
    return mongoose.model(`Game:${collection_language}`, UserSchema);
}





