const sentJwtToClient = (user, res) =>{
    // Generate JWT
    const token = user.generateJswFromUser();

    const {JWT_COOKIE_EXPIRE, NODE_ENV} = process.env;

    return res
        .status(200)
        .cookie("access_token", token, {
            httpOnly: false, // to mate it work with only http
            expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) + 1000),
            secure: NODE_ENV !== "development" // https or http
        })
        .json({
            success: true,
            access_token: token,
            data: {
                name: user.name,
                email: user.email
            }
        });
}

const isTokenIncluded = (req) => {
    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:"); //FIXME: get bearer key from config.env
}

const getAccessTokenFromHeader = (req) => {
    return req.headers.authorization.split(":")[1];
}
module.exports = {
    sentJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeader
};