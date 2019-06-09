module.exports = (sequelize, type) => {
  return sequelize.define("ticket", {
    seatRow: type.INTEGER,
    seatColumn: type.INTEGER
  });
};
