const Game = require("../models/Game");
const asyncErrorWrapper = require("express-async-handler");

const sendGame = asyncErrorWrapper( async (req, res ,next) => {
    let games

    const  {genres} = req.body;

    return res
        .status(200)
        .json({
            data:{
                genre:genres
            },
            success:true,
            message: "Getting game"
        })
});

const saveGame = asyncErrorWrapper( async (req, res, next) => {

    const _game = await  Game("en")
        .create(req.body)

    return res
        .status(200)
        .json({
            success:true,
            message:_game
        })
})

module.exports = {
    sendGame,
    saveGame
}
