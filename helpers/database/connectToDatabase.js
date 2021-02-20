const mongoose = require("mongoose");

const connectToDatabase = () =>{

    mongoose.connect(process.env.MONGO_URI,
        {useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true})
        .then(() => {
            console.log("MongoDB Connection Is Successful")
        })
        .catch(err => {
            console.log(err)
        })
};

module.exports = connectToDatabase;

