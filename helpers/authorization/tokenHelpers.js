const jwt = require("jsonwebtoken");

const sentJwtToClient = (user, res) =>{
    // Generate JWT
    console.log(user)
    if(res.locals.decoded){
        console.log(res.locals.decoded);

        return res
            .status(200)
            .json({
                data:res.locals.decoded
            })
    }
    else{
        const token = user.generateJswFromUser();

        const {JWT_COOKIE_EXPIRE, NODE_ENV} = process.env;

        return res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true, // to mate it work with only http
                expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) + 1000),
                secure: NODE_ENV !== "development" // https or http
            })
            .json({
                success: true,
                access_token: token,
            });
    }
}

const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.toLocaleLowerCase().startsWith("bearer:"); //FIXME: get bearer key from config.env
}

const getAccessTokenFromHeader = (req) => {
    return req.headers.authorization.split(":")[1];
}

const decodeToken = function (token) {
    const {JWT_SECRET_KEY} = process.env;
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        console.log(err)
        if(err){
            return false;
        }
        return decoded;
    })
}

module.exports = {
    sentJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader,
    decodeToken
};