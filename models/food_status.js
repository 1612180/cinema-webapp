module.exports = (sequelize, type) => {
  return sequelize.define("food_status", {
    name: type.STRING
  });
};
