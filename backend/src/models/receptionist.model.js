// models/Receptionist.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Receptionist = sequelize.define(
  "Receptionist",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    shift_timing: {
      type: DataTypes.STRING(50),
    },
    hire_date: {
      type: DataTypes.DATE,
    },
    experience_years: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING(255),
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
    },
    salary_payment_date: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "receptionists",
    timestamps: false,
  }
);

module.exports = Receptionist;
