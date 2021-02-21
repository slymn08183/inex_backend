const dotenv = require("dotenv")
dotenv.config({
    path: "./config/env/config.env"
})
const gameRouter = require("./routers/game");
const authRouter = require("./routers/auth");
const express = require("express");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const connectToDatabase = require("./helpers/database/connectToDatabase");
const app = express();
connectToDatabase();
app.use(express.json());

app.use("/api/game/", gameRouter);

app.use("/api/auth/", authRouter)

app.use(customErrorHandler);
app.listen(process.env.PORT, () => {
    console.log("Server Started At : " + process.env.PORT);
})
