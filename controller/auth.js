const User = require("../models/User");
const asyncErrorWrapper = require("express-async-handler");
const {sentJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");
const CustomError = require("../helpers/error/CustomError")

const register = asyncErrorWrapper( async (req, res ,next) => {

    let user;

    const {name,email,password} = req.body
    user = await  User.create({
        name,
        email,
        password
    });
    sentJwtToClient(user, res);
});


const login = asyncErrorWrapper( async (req, res, next) =>{
    const  {email, password} = req.body;
    if(!validateUserInput(email, password)){
        return next(new CustomError("Please check your inputs.", 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!comparePassword(password, user.password)){
        return next(new CustomError("Please check your credentials!", 400));
    }
    sentJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async(req, res, next) => {

    const {JWT_COOKIE_EXPIRE, NODE_ENV} = process.env
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

const tokenTest = (req, res, next) => {
    res.json({
        success: true,

    })
};

module.exports = {
    register,
    tokenTest,
    login,
    logout
};