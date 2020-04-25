

var config = require('./config');
var MongoClient = require('mongoose');

MongoClient.Promise = require('bluebird');
var Url = 'mongodb://localhost:27017/demo';
module.exports = function () {
    MongoClient.connect(Url,{useUnifiedTopology: true })
        .then(function () {
            console.log("datbase connnected");
        })
        .catch(function (err) {
            console.log(err);
            console.log("Error in connecting to db");
        })

        require('../app/user/user.model');

    }