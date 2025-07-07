module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Payment", {
      bookingId: DataTypes.INTEGER,
      amount: DataTypes.FLOAT,
      status: DataTypes.STRING
    });
  };