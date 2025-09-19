const sequelize = require("../config/database");

const User = require("./user.model");
const Role = require("./role.model");
const Patient = require("./patient.model");
const Doctor = require("./doctor.model");
const Receptionist = require("./receptionist.model");
const Appointment = require("./appoinment.model");
const AuditLog = require("./audit_log.model");
const DiagnosisRecord = require("./diagnosis_record.model");
const Bill = require("./bill.model");
const Permission = require("./permission.model");
const RolePermission = require("./role_permissions.model");
const Prescription = require("./prescription.model");
const SalaryPayment = require("./salary_payment.model");

// // Associations
// Role.hasMany(User, { foreignKey: "role_id" });
// User.belongsTo(Role, { foreignKey: "role_id" });

// baaki associations yahan add kar sakte ho (Appointment, Bills, etc.)
// ...

module.exports = {
  sequelize,
  User,
  Role,
  Patient,
  Doctor,
  Receptionist,
  Appointment,
  AuditLog,
  DiagnosisRecord,
  Bill,
  Permission,
  RolePermission,
  Prescription,
  SalaryPayment,
};
