module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Booking", {
      userId: DataTypes.INTEGER,
      busId: DataTypes.INTEGER,
      seatsBooked: DataTypes.INTEGER
    });
  };