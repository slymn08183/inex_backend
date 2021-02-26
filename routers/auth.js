const {getAccessToRoute, getAccessToRouteWithToken} = require("../middlewares/authorization/auth");
const express = require("express");
const {register, tokenTest, login, logout, permission} = require("../controller/auth");
const router = express.Router();

// noinspection JSCheckFunctionSignatures
router.post("/register", register);

router.post("/login", getAccessToRouteWithToken, login);
// noinspection JSCheckFunctionSignatures
router.post("/token-test", getAccessToRoute, tokenTest)

router.get("/logout", getAccessToRoute, logout)

//router.get("/permission", permission)

module.exports = router;
