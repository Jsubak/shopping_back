const { verifyToken } = require("../middleware/authJwt");
const db = require("../models");
const User = db.user;
const Orders = require("../models/orders.model")

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.findAll = (req, res) => {
    const user = req.query.userid
    User.findOne({where: {userid : user}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
          message:
              err.message || "문제가 있습니다."
      })
    })
};

exports.update = (req, res) => {
    const id = req.query.userid;

    User.update({
        username : req.body.username,
        email : req.body.email
    }, {
        where: { userid : id }
    })
    .then(data => {
        res.send({message: "asdasds"})
    })
    .catch(err => {
        res.status(500).send({
            message: `"에러" ${id}`
        })
    })
}