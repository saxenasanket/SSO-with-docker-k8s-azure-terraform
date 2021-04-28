const uuidv4 = require("uuid/v4");
const Hashids = require("hashids");
const URL = require("url").URL;
const hashids = new Hashids();
const { genJwtToken } = require("./jwt_helper");

const { User } = require("../sequelize");

const re = /(\S+)\s+(\S+)/;

const getUsers = (req, res, next) => {
  User.findAll().then((users) => res.json(users));
};

const createUser = (req, res, next) => {
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  })
    .then(function (note) {
      res.json(note);
    })
    .catch((err) => console.log("error", err));
};

module.exports = Object.assign({}, { getUsers, createUser });
