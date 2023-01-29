const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/model");

const app = express();
// var corsOptions = {
//   origin: "http://localhost:3001",
// };

app.use(cors());
const port = 3001;

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my todo application." });
});

// routes
require("./app/route/auth.route")(app);
require("./app/route/todo.route")(app);

app.listen(port, () => console.log(`app is running on port: ${port}`));
