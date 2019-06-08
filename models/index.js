const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

const UserModel = require("./user");

const User = UserModel(sequelize, Sequelize);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync({ force: true }).then(() => {
  console.log("Tables created");
  return User.create({
    name: 'Hi',
  });
});

module.exports = {
  User
};
