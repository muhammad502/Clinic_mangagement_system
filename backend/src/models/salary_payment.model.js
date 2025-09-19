// models/SalaryPayment.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SalaryPayment = sequelize.define(
  "SalaryPayment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(20),
    },
    status: {
      type: DataTypes.STRING(20),
    },
    notes: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "salary_payments",
    timestamps: false,
  }
);

module.exports = SalaryPayment;
