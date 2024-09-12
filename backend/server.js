const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors") 
const logger = require("morgan");
const mainRoute = require("./routes/index");
const path = require('node:path')
const port = 5000;

dotenv.config();
console.log(process.env.MONGO_URI)
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error)
        throw error;
    }
};

//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/frontend/dist'))) // Static Files
app.use(cors());

app.use("/api/v1", mainRoute);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/dist/index.html'))  
})


app.listen(port, () => {
    connect();
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});
