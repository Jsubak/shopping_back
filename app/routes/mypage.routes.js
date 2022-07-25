module.exports = app => {
    const order = require("../controllers/orders.controller")
    var router = require("express").Router();

    router.get("/", order.findorder);

    app.use('/api/orderinfo', router)
}