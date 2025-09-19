// models/DiagnosisRecord.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DiagnosisRecord = sequelize.define(
  "DiagnosisRecord",
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
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    diagnosis: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "diagnosis_records",
    timestamps: false,
  }
);

module.exports = DiagnosisRecord;
