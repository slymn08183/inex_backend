//const {getAccessToRoute} = require("../middlewares/authorization/auth");
const express = require("express");
const {sendGame, saveGame} = require("../controller/game");
const router = express.Router();

router.post("/get-games", sendGame);
router.post("/save-game", saveGame)

//router.get("/logout", getAccessToRoute, logout)
module.exports = router;
