// src/seed/seed.js
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sequelize, Role, User } = require("../models");

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected");

    await sequelize.sync(); // don't drop tables

    // Create super-admin role if not exists
    const [superRole] = await Role.findOrCreate({
      where: { name: "super-admin" },
    });

    // Check if super admin user already exists
    const existing = await User.findOne({ where: { email: "super@cms.com" } });
    if (!existing) {
      const hashed = await bcrypt.hash("password123", 10);

      const superAdmin = await User.create({
        name: "Super Admin",
        email: "super@cms.com",
        password: hashed,
      });

      await superAdmin.addRole(superRole);
      console.log("✅ Super Admin user created");
    } else {
      console.log("⚠️ Super Admin user already exists");
    }

    process.exit();
  } catch (err) {
    console.error("❌ Error seeding database", err);
    process.exit(1);
  }
}

seed();
