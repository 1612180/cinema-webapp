const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: true
});

const UserModel = require("./user");
const MovieModel = require("./movie");
const TheaterModel = require("./theater");
const TheaterStatusModel = require("./theater_status");
const TicketTypeModel = require("./ticket_type")
const TicketStatusModel = require("./ticket_status")
const ShowTimeModel = require("./show_time")

const User = UserModel(sequelize, Sequelize);
const Movie = MovieModel(sequelize, Sequelize);
const Theater = TheaterModel(sequelize, Sequelize);
const TheaterStatus = TheaterStatusModel(sequelize, Sequelize);
const TicketType = TicketTypeModel(sequelize, Sequelize)
const TicketStatus = TicketStatusModel(sequelize, Sequelize)
const ShowTime = ShowTimeModel(sequelize, Sequelize)

Theater.belongsTo(TheaterStatus)
TicketType.belongsTo(TicketStatus)
ShowTime.belongsTo(Movie)
ShowTime.belongsTo(Theater)
ShowTime.belongsTo(TicketType)

sequelize.sync({ force: true });

module.exports = {
  User,
  Movie,
  Theater,
  TheaterStatus,
  TicketType,
  TicketStatus,
  ShowTime
};
