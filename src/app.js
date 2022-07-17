require("dotenv").config();
const dbConnection = require("./config/database")
const express = require("express");
const bodyParser = require("body-parser");
const doubtRoute = require('./routes/doubtRoute');
const commentRoute = require('./routes/commentRoute');
const authRoute = require("./routes/authRoute");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.DMS_DB)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log("connected to the database"+ process.env.PORT);
      });
    })
    .catch((err) => {
      console.log("could not connect to the database");
    });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/doubts", doubtRoute);
app.use("/comments", commentRoute);
app.use("/auth", authRoute);


module.exports = app;