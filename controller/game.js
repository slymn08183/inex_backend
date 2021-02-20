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
    let _game;

    const {data} = req.body
    console.log(data)
    _game = await  Game("en").create({
        game : data.game
    });

    return res.
        status(200)
        .json({
            success:true,
            message:"Done",
            game:_game
        })
})

module.exports = {
    sendGame,
    saveGame
}
