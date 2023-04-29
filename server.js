const app = require("./app.js");
const DBconnect = require("./data/database.js");

DBconnect();
// console.log(process.env.PORT);

app.listen(process.env.PORT, () =>
  console.log("server is listing from port number 5000")
);
