const sql = require("./db.js");

const Product = function(product) {
    this.productid = product.productid
    this.productname = product.productname;
    this.productdes = product.productdes;
    this.productimg = product.productimg;
    this.productprice = product.productprice
    this.productcount = product.productcount
}

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err.null);
            return;
        }
        console.log("created product: ", {id: res.insertId, ...newProduct});
        result(null, {id: res.insertId, ...newProduct});
    })
}

Product.findById = (id, result) => {
    sql.query(`SELECT * FROM product WHERE productid = ${id}`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return
        }
        if(res.length) {
            console.log("found product: ", res[0])
            result(null, res[0])
            return
        }
        // id를 못찾을 때
        result({kind: "not_found"}, null);
    })
}

Product.getAll = (name, result) => {
    let query = "SELECT * FROM product ";
    if (name) {
        query += `WHERE productname LIKE '%${name}%'`
    }
    sql.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("product: ", res);
        result(null, res);
    })
}

Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE product SET productname = ?, productdes = ?, productimg = ? WHERE productid = ?",
        [product.productname, product.productdes, product.productimg, id],
        (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if(res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return;
            }
            console.log("updated product: ", {id: id, ...product})
            result(null, {id: id, ...product})
        }
    )
}

Product.buy = (product, result) => {
    sql.query(`UPDATE product p INNER JOIN orders o ON p.productid = o.productid SET p.productcount = p.productcount - ${product.productcount} WHERE p.productid = ${product.productid} AND p.productcount > 0`,
    (err, res) => {
        if(err) {
            console.log("error: ", err)
            result(null, err);
            return
        }
        if(res.affectedRows == 0) {
            result({kind: "not_found"}, null)
            return
        }

        console.log("updated product: ", {product: product.productcount})
        result(null, {product: product.productcount})
    }
  )
}

Product.remove = (id, result) => {
    sql.query("DELETE FROM product WHERE productid = ?", id, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if(res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted product with id: ", id);
        result(null, res);
    });
}

module.exports = Product;