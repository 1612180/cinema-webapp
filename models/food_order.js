module.exports = (sequelize, type) => {
  return sequelize.define("food_order", {
    quantity: type.INTEGER
  });
};
