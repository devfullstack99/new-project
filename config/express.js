const express = require("express");
const bodyParser = require('body-parser');

module.exports = function () {
  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true} ));
  var route = require("../app/user/user.route.js")(app);
  return app;
}



