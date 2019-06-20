module.exports = (sequelize, type) => {
    return sequelize.define("admin", {
        adminName: type.STRING,
        hashedPassword: type.TEXT,
        email: {
            type: type.TEXT,
            primaryKey: true
        },
        lastLogin: type.DATE
    });
};