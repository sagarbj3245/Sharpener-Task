module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Bus", {
      name: DataTypes.STRING,
      totalSeats: DataTypes.INTEGER,
      availableSeats: DataTypes.INTEGER
    });
  };