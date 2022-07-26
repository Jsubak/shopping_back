const sql = require("./db.js")
const sqls = require("./index")

const User = function(user) {
    this.userid = user.userid
    this.username = user.username
    this.userpassword = user.userpassword
    this.useremail = user.useremail
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err) => {
        if(err) {
            console.log("error: ", err);
            result(err.null);
            return;
        }
        console.log("created user: ", {...newUser});
        result(null, {...newUser});
    })
}

User.find = (id, password, result) => {
    sql.query(`SELECT * FROM product WHERE userid = ${id} AND userpassword = ${password}`, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null)
            return;
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

module.exports = User;