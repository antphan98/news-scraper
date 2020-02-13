const express = require("express");
const exphbs = require("express-handlebars");

module.exports = function (app) {

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/saved", (req, res) => {
	res.render("saved");
});


};