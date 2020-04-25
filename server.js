const config = require("./config/config");
var bodyParser = require('body-parser');
var db = require("./config/mongoose")();
var express = require("./config/express");
var server = express();

server.listen(config.port);
console.log("Application running on port:" + config.port);
