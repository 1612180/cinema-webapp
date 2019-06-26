module.exports = (sequelize, type) => {
  return sequelize.define("food", {
    name: type.STRING,
    price: type.INTEGER,
    photoUrl: type.TEXT
  });
};
