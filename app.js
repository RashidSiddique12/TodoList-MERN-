const express = require("express");
const app = express();
const router = require("./routes/user.js");
const routerTask = require("./routes/task.js");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const { errorMiddleware } = require("./middlewares/error.js");
const cors = require("cors");
//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/v1", router);
app.use("/api/v1/task", routerTask);

config({
  path: "./data/config.env",
});

app.get("/", (req, res) => {
  res.send("server is on");
});

app.use(errorMiddleware);

module.exports = app;

//
//
//
//

////////////////////////All the things in one file/////////////
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");

// //Middleware
// app.use(express.json());

// mongoose
//   .connect("mongodb://localhost:27017", {
//     dbName: "backendAPI",
//   })
//   .then(() => console.log("Mongo is connected"))
//   .catch((e) => console.log(e));

// //Schema
// const userSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// //Modal
// const User = mongoose.model("User", userSchema);

// app.get("/", (req, res) => {
//   res.send("server is on");
// });

// app.get("/users/all", async (req, res) => {
//   const users = await User.find({});
//   res.json({
//     success: true,
//     users,
//   });
// });

// app.post("/users/new", async (req, res) => {
//   const { name, email, password } = req.body;

//   await User.create({
//     name,
//     email,
//     password,
//   });

//   res.json({
//     success: true,
//     message: "Registraion successfully",
//   });
// });

// ////
// app.get("/userId/:id", async (req, res) => {
//   const { id } = req.params;
//   const users = await User.findById(id);
//   console.log(id);
//   res.json({
//     success: true,
//     users,
//   });
// });

// app.listen(5000, () => console.log("server is listing from port number 5000"));
