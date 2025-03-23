require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const productRoute = require("./routes/products");
const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/v1/product", productRoute);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
