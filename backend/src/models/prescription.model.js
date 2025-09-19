// models/Prescription.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prescription = sequelize.define(
  "Prescription",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    diagnosis_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medicine_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dose: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    special_instructions: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "prescriptions",
    timestamps: false,
  }
);

module.exports = Prescription;
