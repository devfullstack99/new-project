// var users = require('../../app/user/user.controller');
//  passport = require('passport');
// module.exports = function (app) {
//    // console.log(users);
//     app.post("/api/userRegister", users.userRegister, users.authenticateUser);
//     app.post("/api/userLogin", users.authenticateUser);
//     app.get("/api/memberinfo", users.memberinfo);
//     app.get("/api/logout", users.logout);

//     app.post("/api/user/delete",users.delete);
//     app.post("/api/user/update",users.update);
//     app.get("/api/user/getAll",users.getAll);
//     app.post("/api/user/getId",users.getId);
// };



var userCtrl = require('../../app/user/user.controller');

module.exports = function (app) {
    app.route("/api/user/register").post(userCtrl.userRegister, userCtrl.authenticateUser);
    app.route("/api/user/login").post(userCtrl.authenticateUser);
   // app.route("/api/memberinfo").get(userCtrl.memberinfo);
    //app.route("/api/logout").get(userCtrl.logout);

    //app.route("/api/user/create").post(userCtrl.create);
    app.route("/api/user/update").post(userCtrl.update);
    app.route("/api/user/delete").post(userCtrl.delete);
    app.route("/api/user/getAll").get(userCtrl.getAll);
    app.route("/api/user/getId").post(userCtrl.getId);
   

}
