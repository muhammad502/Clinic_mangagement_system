// models/Bill.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bill = sequelize.define(
  "Bill",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    receptionist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    payment_status: {
      type: DataTypes.STRING(20),
    },
    payment_date: {
      type: DataTypes.DATE,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "bills",
    timestamps: false,
  }
);

module.exports = Bill;
