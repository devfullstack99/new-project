var User = require('mongoose').model('user')
    , passport = require('passport')
    , jwt = require('jwt-simple');
config = require("../../config/config"),
    bcrypt = require('bcryptjs');


var userCtrl = {};
var getErrorMessage = function (err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    }
    else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};
userCtrl.authenticateUser = function (req, res) {
    console.log(req.body);
    var promise = User.findOne({
        userName: req.body.userName
    }).exec();
    promise.then(function (user) {
        if (user) {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, config.secret);

                    res.json({
                        success: true,
                        userDetails: {
                            userName: user.userName,
                            token: 'JWT ' + token
                        }
                    });
                }
                else {
                    res.send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }

            });
        }
        else {
            res.send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        }
    }).catch(function (error) {
        res.status(500).json({ error: error });
    });
};

userCtrl.userRegister = function (req, res, next) {
    if (!req.user) {
        console.log(req.body);
        var user = new User(req.body);
        var promise = user.save();
        promise.then(function (data) {
            console.log("user created");
            next()
        })
            .catch(function (error) {
                console.log(error);
                res.status(403).send({
                    success: false,
                    msg: 'Username already exists.'
                });
            })
    }

    else {
        res.send("User details not there");
    }
};

userCtrl.encryptPassword = function (req, res, next) {

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            res.json({ "Error": "Error in Creating password" });
        }
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                res.json({ "Error": "Error in Creating password" });
            }
            req.body.password = hash;
            next();
        });
    });
};


// userCtrl.memberinfo = function (req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//         var decoded = jwt.decode(token, config.secret);
//         var promise = User.findOne({
//             userName: decoded.userName
//         }).exec();
//         promise.then(function (user) {
//             res.json({
//                 success: true,
//                  msg: 'Welcome in the member area ' + user.userName + '!'
//             });
//         })

//             .catch(function (error) {
//                 return res.status(403).send({
//                     success: false,
//                      msg: 'Authentication failed. User not found.'
//                 });
//             })

//     }

//     else {
//         return res.status(403).send({
//             success: false
//             , msg: 'No token provided.'
//         });
//     }
// };
getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};
// userCtrl.logout = function (req, res) {
//     req.logout();
//     res.redirect('/');
// };
userCtrl.create = function (req, res, next) {
    var user = new User(req.body);
    var promise = UserSchema.save();
    promise.then(function (user) {
        res.json(user);
    })
        .catch(function (error) {
            res.status(500).json({ error: error });
        });
};

//user id based deleted
userCtrl.delete = function (req, res) {
    var params = req.body;
    var promise = User.deleteOne({ _id: params._id }).exec();
    promise.then(function (data) {
        res.json(data);
        res.json({
            success: true,
            msg: 'User is deleted sucuessfully'
        });
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ error: error });
    });

};

//user all details
userCtrl.getAll = function (req, res) {
    var params = req.body;
    var promise = User.find({}).exec();
    promise.then(function (data) {
        res.json(data);
        // res.json({
        //     success: true,
        //     msg: ' All user details'
        // });
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ error: error });
    });

};
//user is updated
userCtrl.update = function (req, res) {
    var params = req.body;
    var promise = User.findByIdAndUpdate(params._id, params,
        { safe: true, upsert: true, new: true }).exec();
    promise.then(function (data) {
        res.json(data);
        res.json({
            success: true,
            msg: 'User is updated sucuessfully'
        });
    })
        .catch(function (error) {
            res.status(500).json({ error: error });
        });
};
// user id based details
userCtrl.getId = function (req, res) {
    var params = req.body;
    var promise = User.findOne({ _id: params._id }).exec();
    promise.then(function (data) {
        res.json(data);
        res.json({
            success: true,
            msg: 'User is details '
        });
    }).catch(function (error) {
        console.log(error);
        res.status(500).json({ error: error });
    });

}

module.exports = userCtrl;
