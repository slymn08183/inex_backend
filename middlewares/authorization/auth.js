const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const {isTokenIncluded, getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");
const {JWT_SECRET_KEY} = process.env;
const getAccessToRoute = (req, res, next) => {


    if(res.locals.access_token){
        //return next(new CustomError("You are not authorized to access this route! Please provide access a token"), 401); //FIXME: Move string to config.env
        return next()
    }

    jwt.verify(getAccessTokenFromHeader(req), JWT_SECRET_KEY, (err, decoded) => {
        //console.log(err)
        if(err){
            return next(new CustomError("You are not authorized to access this route!"), 401); //FIXME: Move string to config.env
        }
        //console.log(decoded);
        next();
    })
};

const getAccessToRouteWithToken = (req, res, next) => {
    //return next();
    if(!isTokenIncluded(req)){
        res.locals.access_token = false;
        res.locals.decoded = false;
        return next();
    }

    jwt.verify(getAccessTokenFromHeader(req), JWT_SECRET_KEY, (err, decoded) => {
        //console.log(err)
        //console.log(decoded.secret)
        if(err || decoded.secret !== process.env.JWT_INTERNAL_SECRET_KEY){
            console.log("Token asdasdas")
            res.locals.access_token = false;
            res.locals.decoded = false;
            return next();
        }
        console.log("Token TRUE")
        res.locals.access_token = true;
        res.locals.decoded = decoded;
        return next();
    })

};

module.exports = {
    getAccessToRoute,
    getAccessToRouteWithToken
}

