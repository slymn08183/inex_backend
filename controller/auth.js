const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword, validateLastChangedAt} = require("../helpers/input/inputHelpers");
const CustomError = require("../helpers/error/CustomError")

const register = asyncErrorWrapper( async (req, res ,next) => {
    const user = await  User.create(req.body);
    sendJwtToClient(user, res);
});


const login = asyncErrorWrapper( async (req, res, next) =>{

    if(res.locals.access_token){
        const {email} = res.locals.decoded

        const user = await User.findOne({email});
        if(user && validateLastChangedAt(res.locals.decoded.lastChangedAt, user.lastChangedAt)){
            console.log("Access with token")
            return sendJwtToClient(user, res)
        }
    }

    const {email, password} = req.body;

    if(!validateUserInput(email, password)){
        console.log()
        return next(new CustomError("Please check your inputs.", 400));
    }

    const user = await User.findOne({email:email}).select("+password");
    if(!user){
        return next(new CustomError("There is no such user!", 400));
    }

    if(!comparePassword(password, user.password)){
        return next(new CustomError("Please check your credentials!", 400));
    }

    console.log("Access with password")
    return sendJwtToClient(user, res)

});

const logout = asyncErrorWrapper(async(req, res, next) => {

    const {NODE_ENV} = process.env
    return res
        .status(200)
        .cookie({
            httpOnly: false,
            expires: new Date(Date.now()),
            secure: NODE_ENV !== "development"
        })
        .json({
            success: true,
            message: "Logout successful!"
        })

});

const logoutFromEverywhere = asyncErrorWrapper(async(req, res, next) => {

    const {NODE_ENV} = process.env

    return res
        .status(200)
        .cookie({
            httpOnly: false,
            expires: new Date(Date.now()),
            secure: NODE_ENV !== "development"
        })
        .json({
            success: true,
            message: "Logout successful!"
        })

})

const tokenTest = (req, res, next) => {
    res.json({
        success: true,
        message:"Token is valid!"
    })
};

module.exports = {
    register,
    tokenTest,
    login,
    logout,
    logoutFromEverywhere
};