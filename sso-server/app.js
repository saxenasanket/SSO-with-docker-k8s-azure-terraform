const express = require("express");
const morgan = require("morgan");
const app = express();
const engine = require("ejs-mate");
const session = require("express-session");
const router = require("./router");
// const Logger = require("@ptkdev/logger");
// const logger = new Logger();
// logger.info("message");
const { User } = require("./sequelize");
const { validate, ValidationError, Joi } = require("express-validation");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use((req, res, next) => {
  // logger.info("test");

  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));
app.engine("ejs", engine);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// app.get("/users", (req, res, next) => {
//   User.findAll().then((users) => res.json(users));
// });

// app.post("/users", (req, res, next) => {
//   User.create({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     email: req.body.email,
//   })
//     .then(function (note) {
//       res.json(note);
//     })
//     .catch((err) => console.log("error", err));
// });

app.use("/users", router);
app.use("/simplesso", router);
app.get("/", (req, res, next) => {
  const user = req.session.user || "unlogged";
  res.render("index", {
    what: `SSO-Server ${user}`,
    title: "SSO-Server | Home",
  });
});

app.use((req, res, next) => {
  // catch 404 and forward to error handler
  const err = new Error("Resource Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error({
    message: err.message,
    error: err,
  });

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }
  const statusCode = err.status || 500;
  let message = err.message || "Internal Server Error";

  if (statusCode === 500) {
    message = "Internal Server Error";
  }
  res.status(statusCode).json({ message });
});

module.exports = app;
