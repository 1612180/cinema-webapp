const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: true
});

const UserModel = require("./user");
const MovieModel = require("./movie");
const TheaterModel = require("./theater");
const TheaterStatusModel = require("./theater_status");

const User = UserModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);
const Theater = TheaterModel(sequelize, Sequelize);
const TheaterStatus = TheaterStatusModel(sequelize, Sequelize);

Theater.belongsTo(TheaterStatus)

sequelize.sync({ force: true });

module.exports = {
  User,
  Movie,
  Theater,
  TheaterStatus
};
