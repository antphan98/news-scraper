const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const axios = require("axios");
const cheerio = require("cheerio");
const htmlRoutes = require("./controllers/html-routes.js");
const apiRoutes = require("./controllers/api-routes.js");


const PORT = process.env.PORT || 3000;

const app = express();

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(logger("dev"));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("public"));

app.use("/", htmlRoutes);
app.use("/", apiRoutes);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/news-scraper'; 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on("error", function(error) {
    console.log("Mongoose Error: ", error);
  });

app.listen(PORT, function() {
    console.log("App running on PORT 3000!");
  });