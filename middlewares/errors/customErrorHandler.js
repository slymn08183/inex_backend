const CustomError = require("../../helpers/error/CustomError");
const {errorHolderMongooseValidation} = require("../../helpers/error/ErrorHolder");

const customErrorHandler = (err,req,res,next) => {

    let customErr = err;

    if(err === SyntaxError){
        customErr = new CustomError("Unexpected Syntax", 400);
    }
    else if(err.code === 11000){
        if(err.keyPattern.hasOwnProperty("email")){
            customErr = new CustomError("This e-mail is already in use!", 400);
        }
        else if(err.keyPattern.hasOwnProperty("game.name")){
            customErr = new CustomError("This game is already in database!", 400);
        }
        else{
            customErr = new CustomError("Unknown Database Error!", 500)
        }
    }
    else if(err.status === 401){
        customErr = new CustomError("UNAUTHORIZED", 401)
    }
    else if(err.hasOwnProperty("_message") && err._message === "User validation failed"){
        customErr = new CustomError("undefined", 400, errorHolderMongooseValidation(err))
    }

    console.log(err)
    res
        .status(customErr.status || 500)
        .json({
            success:false,
            message:customErr.internalMessage || customErr.toString() || "Internal server error!",
        });
}

module.exports = customErrorHandler;