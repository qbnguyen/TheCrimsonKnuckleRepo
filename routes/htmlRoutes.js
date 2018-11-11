let path = require("path");

// Routes
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/landing.1.html"));
  });

  app.get("/dashboard", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/create-group", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/create-group.html"));
  });

  app.get("/join-group", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/join-group.html"));
  });

  app.get("/voting", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/voting.html"));
  });

  app.get("/chosen", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/chosen.html"));
  });

}; // module.exports