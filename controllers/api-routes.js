const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const Article = require("../models/Article.js");

module.exports = function (app) {

    app.get("/scrape", function(req, res) {

        axios.get("https://www.cnet.com/news/").then(function (response) {
            const $ = cheerio.load(response.data);
            const results = [];
    
            $("h6").each(function(i, element) {
          
              const title = $(element).text();
    
              const link = $(element).children().attr("href");
          
              results.push({
                title: title,
                link: link
              });
            });
          
            console.log(results);

    })

    });

    app.get("/articles/saved", function(req, res) {
        db.Article.find({saved: true}).sort({created: 1}).limit(30).populate("note")
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
      });

    };