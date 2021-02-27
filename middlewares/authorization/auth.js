const CustomError = require("../../helpers/error/CustomError");
const jwt = require("jsonwebtoken");
const {isTokenIncluded, getAccessTokenFromHeader, getAdminTokenFromHeader} = require("../../helpers/authorization/tokenHelpers");
const {compareInternalSecretKey} = require("../../helpers/input/inputHelpers")
const {JWT_ADMIN_KEY, JWT_SECRET_KEY} = process.env;

const getAccess = (req, res, next) => {

    jwt.verify(getAdminTokenFromHeader(req), JWT_ADMIN_KEY, (err, decoded) => {
        //console.log(err)
        if(err ){
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

        console.log("Token Decoded: \n" + decoded)
        if(err || !compareInternalSecretKey(decoded.secret)){
            console.log("Token Internal Key Failed")
            console.log(err)
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
    getAccess,
    getAccessToRouteWithToken
}

