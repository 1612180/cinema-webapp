module.exports = (sequelize, type) => {
    return sequelize.define("ticket_type", {
      name: type.STRING,
      price: type.INTEGER,
    });
  };
