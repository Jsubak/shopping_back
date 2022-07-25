module.exports = app => {
    const user = require("../controllers/user.sequelize.controller");
    var router = require("express").Router();

    // router.post("/", user.create);

    // router.get("/:id", user.find);

    router.get("/", user.findAll)

    app.use('/api/user', router);
}