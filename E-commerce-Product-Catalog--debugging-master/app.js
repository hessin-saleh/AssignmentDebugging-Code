require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

// mongoose
//   .connect(process.env.DB_URL)
//   .then(() => console.log("DB Connected"))
//   .catch((err) => console.log(err));

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
app.use("/api", productRoutes);

app.listen(3000, () => console.log("Server Running"));
