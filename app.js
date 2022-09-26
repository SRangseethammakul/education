const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

const config = require("./config/index");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const lineRouter = require("./routes/line");
const examRouter = require("./routes/exam");
const outboundRouter = require("./routes/outbound");
const studentRouter = require("./routes/student");

const app = express();

TZ = "Asia/Bangkok";

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/line", lineRouter);
app.use("/exam", examRouter);
app.use("/out-bound", outboundRouter);
app.use("/student", studentRouter);

module.exports = app;
