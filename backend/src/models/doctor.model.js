// models/Doctor.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Doctor = sequelize.define(
  "Doctor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    specialization: {
      type: DataTypes.STRING(100),
    },
    qualification: {
      type: DataTypes.STRING(100),
    },
    experience_years: {
      type: DataTypes.INTEGER,
    },
    license_no: {
      type: DataTypes.STRING(50),
    },
    available_days: {
      type: DataTypes.STRING(100),
    },
    available_time: {
      type: DataTypes.STRING(100),
    },
    salary: {
      type: DataTypes.DECIMAL(10, 2),
    },
    salary_payment_date: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "doctors",
    timestamps: false,
  }
);

module.exports = Doctor;
