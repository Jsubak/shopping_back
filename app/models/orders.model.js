const sql = require("./db.js")

const Orders = function(orders) {
    this.userid = orders.userid
    this.productid = orders.productid
    this.address = orders.address
    this.phone = orders.phone
    this.productcount = orders.productcount
    this.productprice = orders.productprice
}

Orders.create = (newOrders, result) => {
    sql.query("INSERT INTO orders SET ?", newOrders, (err, res) => {
        if(err) {
            console.log("error: ", err)
            result(err.null);
            return
        }
        console.log("created orders: ", {orderid: res.InsertOrderid, ...newOrders})
        result(null, {orderid: res.InsertOrderid, ...newOrders})
    })
}

module.exports = Orders