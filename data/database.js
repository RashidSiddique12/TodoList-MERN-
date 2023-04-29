const mongoose = require("mongoose");

const DBconnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "TODOLIST",
    })
    .then((c) => console.log(`Data is connected ${c.connection.host}`))
    .catch((e) => console.log(e));
};

module.exports = DBconnect;
