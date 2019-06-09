module.exports = (sequelize, type) => {
  return sequelize.define("show_time", {
    time: type.TIME,
    date: type.DATE
  });
};
