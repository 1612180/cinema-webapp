module.exports = (sequelize, type) => {
  return sequelize.define("movie", {
    name: type.STRING,
    rating: type.FLOAT,
    actor: type.TEXT,
    director: type.TEXT,
    photoUrl: type.TEXT,
    introduce: type.TEXT,
    startDate: type.DATE,
    endDate: type.DATE
  });
};
