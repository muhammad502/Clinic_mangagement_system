// models/Patient.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define(
  "Patient",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING(10),
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.STRING(255),
    },
    medical_history: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "patients",
    timestamps: false,
  }
);

module.exports = Patient;
