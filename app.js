require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connect");
const productRoute = require("./routes/products");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/product">products route</a>');
});

app.use("/api/v1/product", productRoute);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT} `);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
