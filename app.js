const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const knex = require("./db/client");

const app = express();
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log("Cookies:", req.cookies);
  const username = req.cookies.username;
  res.locals.username = "";

  if (username) {
    res.locals.username = username;
    console.log(`Signed in as ${username}`);
  }
 next();
})

app.get("/", (req, res) => {
  res.redirect("/clucks");
})

app.get("/sign_in", (req, res) => {
  res.render("signIn");
})

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
app.post("/sign_in", (req, res) => {
  const username = req.body.username;
  res.cookie("username", username, { maxAge: COOKIE_MAX_AGE });
  res.redirect("/");
})

app.post("/sign_out", (req, res) => {
  res.clearCookie("username");
  res.redirect("/");
})

const clucksRouter = require("./routes/clucks");

app.use("/clucks", clucksRouter);

const PORT = 3535;
const HOST = "localhost"; // 127.0.0.1
app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});