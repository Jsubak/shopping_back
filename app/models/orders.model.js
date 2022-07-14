const sql = require("./db.js")

const Orders = function(orders) {
    this.userid = orders.userid
    this.productid = orders.productid
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