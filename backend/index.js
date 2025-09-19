const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// middlewares
app.use(express.json());
app.use(cors());

// import models & db
const db = require("./src/models/association.js");

// Sync all models with DB
db.sequelize.sync({ alter: true })
// db.sequelize.sync({ force: false });

//All routes
const authRoutes = require("./src/routes/authRoute.js");
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
