module.exports = (sequelize, type) => {
    return sequelize.define("ticket_status", {
      name: type.STRING,
    });
  };
