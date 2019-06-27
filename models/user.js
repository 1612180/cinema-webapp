module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    username: type.STRING,
    hashedPassword: type.TEXT,
    email: type.TEXT,
    phoneNumber: type.TEXT,
    tokenRecover: type.TEXT
  });
};
