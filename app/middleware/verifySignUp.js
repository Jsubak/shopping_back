const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
      // Username
      let user = await User.findOne({
        where: {
          username: req.body.username
        }
      });
      if (user) {
        return res.status(400).send({
          message: "중복된 이름입니다!"
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
        message: "Unable to validate Username!"
      });
    }
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail
};
module.exports = verifySignUp;
  