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

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};
module.exports = verifySignUp;
  