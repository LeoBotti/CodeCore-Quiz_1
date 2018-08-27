const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());