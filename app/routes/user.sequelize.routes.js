const { authJwt } = require("../middleware");
const controller = require("../controllers/user.sequelize.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
    app.get("/api/test/all", controller.allAccess);
};