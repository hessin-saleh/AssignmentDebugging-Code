require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("DB Connected");
};
connectDB();

app.use("/api", bookRoutes);

app.listen(3000, () => console.log("Library Server Running"));
