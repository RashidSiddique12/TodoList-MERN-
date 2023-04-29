const mongoose = require("mongoose");

const DBconnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "TODOLIST",
    })
    .then(() => console.log("Mongo is connected"))
    .catch((e) => console.log(e));
};

module.exports = DBconnect;
