const Orders = require("../models/orders.model")

exports.create = (req, res) => {

    if(!req.body) {
        res.status(400).send({
            message: "내용이 비어있으면 안됨~"
        })
    }

    const orders = {
        userid: req.body.userid,
        productid: req.body.productid,
        address: req.body.address,
        phone: req.body.phone,
        productcount: req.body.productcount,
        productprice: req.body.productprice
    }

    Orders.create(orders, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "orders 테이블에 넣는데 에러났음"
            });
        else res.send(data);
    })  
}

exports.findorder = (req, res) => {
    const orderid = req.query.userid
    Orders.findOne(orderid, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "userid에 에러났음"
            });
        else res.send(data);
    })
}