module.exports = (sequelize, type) => {
  return sequelize.define("banner", {
    photoUrl: type.TEXT
  });
};
