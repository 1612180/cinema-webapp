module.exports = (sequelize, type) => {
    return sequelize.define("movie_genre", {
      name: type.STRING,
    });
  };
