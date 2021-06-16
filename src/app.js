const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//defining paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//set up handlebars
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// static directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pulkit",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Pulkit",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "Coming soon!",
    name: "Pulkit",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide some address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      } else {
        forecast(latitude, longitude, (error, data) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            location,
            data: data,
            address: req.query.address,
          });
        });
      }
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("handle", {
    error_msg: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("handle", {
    error_msg: "My 404 page",
  });
});

app.listen(port, () => {
  console.log("server running on port " + port);
});
