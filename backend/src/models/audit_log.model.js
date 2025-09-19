// models/AuditLog.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const AuditLog = sequelize.define(
  "AuditLog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    action_type: {
      type: DataTypes.STRING(20),
    },
    table_name: {
      type: DataTypes.STRING(100),
    },
    record_id: {
      type: DataTypes.INTEGER,
    },
    requested_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    approved_by: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING(20),
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "audit_logs",
    timestamps: false,
  }
);

module.exports = AuditLog;
