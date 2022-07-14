module.exports = app => {
    const orders = require("../controllers/orders.controller")
    var router = require("express").Router()

    router.post("/", orders.create);

    app.use('/api/orders', router);
}