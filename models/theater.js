module.exports = (sequelize, type) => {
  return sequelize.define("theater", {
    name: type.STRING,
    address: type.TEXT,
    photoUrl: type.TEXT,
    rowNum: type.INTEGER,
    seatPerRow: type.INTEGER
  });
};
