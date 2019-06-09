module.exports = (sequelize, type) => {
  return sequelize.define("food_shopping_cart", {
    quantity: type.INTEGER
  });
};
