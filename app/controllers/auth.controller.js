const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    // Save User to Database
    try {
      const user = await User.create({
        userid: req.body.userid,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      })
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        userid: req.body.userid,
      },
    });
    if (!user) {
      return res.status(404).send({ message: "이름을 찾을 수 없습니다" });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "비밀번호가 올바르지 않습니다!",
      });
    }
    const token = jwt.sign({ userid: user.userid }, config.secret, {
      expiresIn: 86400, // 24 hours
    });
    req.session.token = token;
    return res.status(200).send({
      userid: user.userid,
      username: user.username,
      email: user.email
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
    try {
      req.session = null;
      return res.status(200).send({
        message: "You've been signed out!"
      });
    } catch (err) {
      this.next(err);
    }
};