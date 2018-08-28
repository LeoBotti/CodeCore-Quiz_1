const express = require("express");
const router = express.Router();
const knex = require("../db/client");
const timeago = require("timeago.js");

router.get("/new", (req, res) => {
  res.render("clucks/new");
})

router.post("/new", (req, res) => {
  const { content, imageURL, createdAt } = req.body
  const username = req.cookies.username;

  knex("clucks")
    .insert({
      content,
      imageURL,
      createdAt,
      username
    })
    .then(() => {
      res.redirect("/clucks");
    })
})

router.get("/", (req, res) => {
  knex("clucks")
    .orderBy("createdAt", "desc")
    .then(clucks => {
      res.render("clucks/index", { clucks, timeago });
    });
})

module.exports = router;