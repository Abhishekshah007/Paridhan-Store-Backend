const express = require("express");

const routes = express.Router();
const {home} = require("../controllers/homeController")

routes.route("/").get(home);

module.exports = routes;

