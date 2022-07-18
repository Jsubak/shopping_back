const Orders = require("../models/orders.model")

exports.create = (req, res) => {

    if(!req.body) {
        res.status(400).send({
            message: "내용이 비어있으면 안됨~"
        })
    }

    const orders = new Orders ({
        userid: req.body.userid,
        productid: req.body.productid,
        address: req.body.address,
        phone: req.body.phone
    })

    Orders.create(orders, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "orders 테이블에 넣는데 에러났음"
            });
        else res.send(data);
    })
}