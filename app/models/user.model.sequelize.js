module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id : {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return User;
};

// module.exports = (sequelize, Sequelize) => {
//   const Order = sequelize.define("orders", {
//     orderid : {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     userid: {
//       type: Sequelize.STRING
//     },
//     productid : {
//       type: Sequelize.INTEGER
//     },
//     address: {
//       type: Sequelize.STRING
//     },
//     phone: {
//       type: Sequelize.INTEGER
//     },
//     productcount: {
//       type: Sequelize.INTEGER
//     },
//     productprice: {
//       type: Sequelize.INTEGER
//     }
//   });
//   return Order;
// }
  