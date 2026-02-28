require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const connectDB = async () => {
  // Bug: Missing error handling for the database connection. If the `DB_URL` is incorrect or the database is down, it will cause an Unhandled Promise Rejection.
  // Fix: Wrapped the database connection in a try...catch block to log the error properly and prevent silent crashes.
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
   
  }
};
connectDB();

app.use("/api", bookRoutes);

// Bug: Hardcoding the port to 3000 can cause issues when deploying to cloud platforms (like Render or Heroku) which assign ports dynamically via environment variables.
// Fix: Set the port to check `process.env.PORT` first, and fallback to 3000 if not found.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Library Server Running on port ${PORT}`));
