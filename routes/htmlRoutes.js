let path = require("path");

// Routes
module.exports = function (app) {

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/voting", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/voting.html"));
  });

  app.get("/voting/group/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/voting.html"));
  });

  app.get("/ideas", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/ideas.html"));
  });

  app.get("/ideas/group/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/ideas.html"));
  });

  app.get("/winning", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/winning_vote.html"));
  });

  app.get("/winning/group/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/winning_vote.html"));
  });

}; // module.exports