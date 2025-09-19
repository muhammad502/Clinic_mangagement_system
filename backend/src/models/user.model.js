const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Role = require("./role.model");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // new users are unverified by default
    },
    verify_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reset_otp: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    reset_otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

User.belongsTo(Role, { foreignKey: "role_id" });
Role.hasMany(User, { foreignKey: "role_id" });

module.exports = User;
