const CustomError = require("../../helpers/error/CustomError");

const customErrorHandler = (err,req,res,next) => {

    let customErr = err;
    console.log(err)
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


    res
        .status(customErr.status || 500)
        .json({
            success:false,
            message:customErr.toString()
        });

}

module.exports = customErrorHandler;