const express = require("express");
const router = express.Router();

const cleanBody = require("../crud_test/middlewares/cleanbody");
const { validateToken } = require("../crud_test/middlewares/validateToken");

const AuthController = require("../crud_test/controllers/user.controller");

router.post("/signup", cleanBody, AuthController.Signup);

router.post("/login", cleanBody, AuthController.Login);

router.patch("/forgot", cleanBody, AuthController.ForgotPassword);

router.get("/logout", validateToken, AuthController.Logout);

module.exports = router;