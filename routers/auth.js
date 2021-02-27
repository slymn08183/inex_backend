const {getAccess, getAccessToRouteWithToken} = require("../middlewares/authorization/auth");
const express = require("express");
const {register, tokenTest, login, logout, permission} = require("../controller/auth");
const router = express.Router();

// noinspection JSCheckFunctionSignatures
router.post("/register", register);

router.post("/login", getAccessToRouteWithToken, login);
// noinspection JSCheckFunctionSignatures
router.post("/token-test", getAccess, tokenTest)

router.get("/logout", getAccess, logout)

//router.get("/permission", permission)

module.exports = router;
