const express = require("express");
const Logout = require("../crud_test/controllers/logOut");
const Login = require("../crud_test/controllers/Login");
const ForgotPassword = require("../crud_test/controllers/forgotPassword");
const Signup = require("../src/controllers/Signup");

module.exports = {
  logout:Logout,
  login: Login,
  forgotpasswprd: ForgotPassword,
  Signup: Signup
}