const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
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
      if (req.body.roles) {
        const roles = await Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        });
        const result = user.setRoles(roles);
        if (result) res.send({ message: "User registered successfully!" });
      } else {
        // user has role = 1
        const result = user.setRoles([1]);
        if (result) res.send({ message: "User registered successfully!" });
      }
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
      return res.status(404).send({ message: "아이디를 찾을 수 없습니다" });
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

    const token = jwt.sign({ id: user.id, userid: user.userid }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    let authorities = [];
    const roles = await user.getRoles();
    for (let i = 0; i < roles.length; i++) {
      authorities.push("ROLE_" + roles[i].name.toUpperCase());
    }

    req.session.token = token;

    return res.status(200).send({
      userid: user.userid,
      username: user.username,
      email: user.email,
      accessToken: token
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

// exports.me = async (req, res) => {
//   try {
//     const user = await User.findOne({
//       attributes: ["type"],
//       where: {
//         id: req.userid,
//       },
//     });
//     if (user) {
//       return res.status(200).json({
//         description: "회원정보 보기",
//         content: user,
//       });
//     }
//   } catch (err) {
//     return res.status(500).send("Error -> " + err);
//   }
// };