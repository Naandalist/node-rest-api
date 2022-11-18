const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("./src/config");
const route = require("./src/routes");
const cors = require("cors");

//Connect to database
try {
  mongoose.connect(config.urlDbProd, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("connected to db");
} catch (error) {
  console.log("FAIL to connect into db");
  handleError(error);
}
process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error.message);
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
);

const port = config.port || 8080;

app.listen(port, function () {
  console.log(`App running on port ${port}`);
});

app.use(cors());
app.use("/api", route);
