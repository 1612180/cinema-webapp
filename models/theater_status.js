module.exports = (sequelize, type) => {
  return sequelize.define("theater_status", {
    name: type.STRING,
  });
};
