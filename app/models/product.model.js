const sql = require("./db.js");

const Product = function(product) {
    this.productname = product.productname;
    this.productdes = product.productdes;
    this.productimg = product.productimg;
}