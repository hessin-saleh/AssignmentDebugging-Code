require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

app.use("/api", productRoutes);

app.listen(3000, () => console.log("Server Running"));
