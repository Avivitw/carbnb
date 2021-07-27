const cars = require("./cars");
const users = require("./users");
const locations = require("./locations");
const availability = require("./availability");
const orders = require("./orders");
const reviews = require("./reviews");
const favourites = require("./favourites");
const auth = require("./auth");
const messages = require("./messages");

module.exports = (app) => {
  app.use("/api/cars", cars);
  app.use("/api/users", users);
  app.use("/api/locations", locations);
  app.use("/api/availability", availability);
  app.use("/api/orders", orders);
  app.use("/api/reviews", reviews);
  app.use("/api/favourites", favourites);
  app.use("/api/auth", auth);
  app.use("/api/messages", messages);
};
