
var userCtrl = require('../../app/user/user.controller');

module.exports = function (app) {
    app.route("/api/user/register").post(userCtrl.userRegister, userCtrl.authenticateUser);
    app.route("/api/user/login").post(userCtrl.authenticateUser);
    app.route("/api/user/update").post(userCtrl.update);
    app.route("/api/user/delete").post(userCtrl.delete);
    app.route("/api/user/getAll").get(userCtrl.getAll);
    app.route("/api/user/getId").post(userCtrl.getId);
   

}
