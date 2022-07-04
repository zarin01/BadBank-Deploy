require("dotenv").config({ path: "./config.env" });
const express = require("express");
// const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const mongoose = require("mongoose");

// connects to database
// connectDB();
mongoose.connect(
  "mongodb+srv://zarin01:zn100101@bankdata.q6e0m.mongodb.net/bank-info",
  () => {
    console.log("connected to database");
  },
  (e) => {
    console.log(e);
  }
);

//Addes the app variable to express
const app = express();

//! Conntect the server to the routes & controllers
//middleware
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

//! Error Handler (Should always be the last middleware)
app.use(errorHandler);

//Listens for the port and if there is none then it will use port 5000

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
