const { validate } = require("express-validation");
const paramValidation = require("../config/param-validation");

const express = require("express");
const router = express.Router();
const controller = require("../controller");
const userController = require("../controller/user-controller");

router.route("/login").get(controller.login).post(controller.doLogin);

router
  .route("/")
  .get(userController.getUsers)
  .post(validate(paramValidation.createUser), userController.createUser);

router.get("/verifytoken", controller.verifySsoToken);

module.exports = router;
