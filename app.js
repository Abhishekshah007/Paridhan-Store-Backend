require("dotenv").config();
const express = require("express");
const ejs = require('ejs');
const fileUpload = require("express-fileupload")
const swaggerui = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const YAML = require("yamljs");
const cloudinary = require("cloudinary").v2;
const app=express();

// swagger config
const swaggerDocument = YAML.load("./swagger.yaml");
app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerDocument));

// middleware config
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));
app.use(express.urlencoded({ extended: true }));

// morgan config
app.use(morgan("tiny"));


app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);


app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// all the routes
const home = require("./routes/Home");
const user = require("./routes/user");
const product = require("./routes/Product");
const Order = require("./routes/Order");
const Payment = require("./routes/Payment");

app.use('/api/v1',home)
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", Order);
app.use("/api/v1", Payment);
module.exports= app;