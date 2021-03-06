// GENERAL
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();

// GENERAL MIDDLEWARES
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// PERSONAL REQUIRES
const loginRoute = require("./routes/login");
app.use("/", loginRoute);
const registerRoute = require("./routes/register");
app.use("/", registerRoute);
const logoutRoute = require("./routes/logout");
app.use("/", logoutRoute);

// DATABASE
mongoose.connect("process.env.DATABASE_URI, (err) =>
  err ? console.log(err) : console.log("Connected to DB")
);

// UNHANDLED
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(process.env.PORT || 3003, () => console.log("server spinning"));
