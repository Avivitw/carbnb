// Load environment variables from .env
require("dotenv").config();

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const expressWs = require("express-ws");
expressWs(app);

// Load port from environment
const PORT = process.env.PORT || 8080;

// Express Configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// import routes
const mountRoutes = require("./routes");
// Setup / mount routes
mountRoutes(app);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express server listening on port ${PORT}.`);
});
