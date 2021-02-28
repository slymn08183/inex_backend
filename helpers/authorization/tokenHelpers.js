const jwt = require("jsonwebtoken");

const sendJwtToClient = (user, res) =>{
    // Generate JWT

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

const sendAdminToken= (token, res) =>{
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

const getUserFromToken = (token) => {

}

const isTokenIncluded = (req) => {
    console.log(req.headers)
    return req.headers.accessToken && req.headers.accessToken.toLocaleLowerCase().startsWith("bearer:"); //FIXME: get bearer key from config.env
}

const getAccessTokenFromHeader = (req) => {

    return req.headers.accessToken.split(":")[1];
}

const getAdminTokenFromHeader = (req) => {
    return req.headers.adminToken.split(":")[1];
}

const decodeToken = function (token) {
    const {JWT_SECRET_KEY} = process.env;
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        console.log(err)// FIXME: write it to database
        if(err){
            return false;
        }
        return decoded;
    })
}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader,
    decodeToken,
    getAdminTokenFromHeader
};