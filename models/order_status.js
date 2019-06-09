module.exports = (sequelize, type) => {
  return sequelize.define("order_status", {
    name: type.STRING
  });
};
