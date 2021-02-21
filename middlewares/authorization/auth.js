const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const {isTokenIncluded, getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");
const {JWT_SECRET_KEY} = process.env;
const getAccessToRoute = (req, res, next) => {

    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this route!"), 401); //FIXME: Move string to config.env
    }

    jwt.verify(getAccessTokenFromHeader(req), JWT_SECRET_KEY, (err, decoded) => {
        console.log(err)
        if(err){
            return next(new CustomError("You are not authorized to access this route!"), 401); //FIXME: Move string to config.env
        }
        console.log(decoded);
        next();

    })

};


module.exports = {
    getAccessToRoute
};

