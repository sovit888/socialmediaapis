require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require("./route/auth");
const userRoutes = require("./route/user");
const postRoutes = require("./route/post");
const likeRoutes = require("./route/like");

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", likeRoutes);

app.listen(process.env.PORT);
