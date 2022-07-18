const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
      // Userid
      let user = await User.findOne({
        where: {
          userid: req.body.userid
        }
      });
      if (user) {
        return res.status(400).send({
          message: "중복된 아이디입니다!"
        });
      }
      // Email
      user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (user) {
        return res.status(400).send({
          message: "중복된 이메일입니다!"
        });
      }
      next();
    } catch (error) {
      return res.status(500).send({
        message: "유효하지 않습니다"
      });
    }
}

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "실패했습니다 = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};
module.exports = verifySignUp;
  