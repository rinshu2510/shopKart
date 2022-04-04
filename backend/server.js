const app = require("./app")
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');
const connectDatabase = require('./config/database')

// Handling uncaught Exception 

process.on("uncaughtException", (err) => {

    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


//config

dotenv.config({ path: "backend/config/config.env" });

//connecting to database
// we are calling connectDatabase function below the config function beacuse we have url in config.env and that will load after we set the environment

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection

process.on("unhandledRejection", err => {
    console.log(`Error : ${err.message}`);
    console.log(`shutting down the server due to unhandled Promise Rejection`);
    server.close(() => {
        process.exit(1);
    });
});