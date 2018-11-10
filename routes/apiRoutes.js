let db = require("../models");

let iDecideDBRoutes = (app) => {
    console.log("Routes function connected!!!");

    // POST route for saving a new group
    app.post("/api/groups", function(req, res) {
        console.log(req.body);
        db.groups.create({
            admin_name: req.body.admin_name,
            admin_email: req.body.admin_email,
            group_name: req.body.group_name,
            decide_on: req.body.decide_on,
            time: req.body.time,
            votes: req.body.votes,
            password:req.body.password
        }).then(function(dbGroups) {
        // We have access to the new group as an argument inside of the callback function
        res.json(dbGroups);
        });
    });

    // POST route for saving a new user
    app.post("/api/users", function(req, res) {
        console.log(req.body);
        db.users.create({
            name: req.body.name,
            email: req.body.email,
            group_ID: req.body.group_ID
        }).then(function(dbUsers) {
        // We have access to the new user as an argument inside of the callback function
        res.json(dbUsers);
        });
    });

    // POST route for saving a new idea
    app.post("/api/ideas", function(req, res) {
        console.log(req.body);
        db.ideas.create({
            idea: req.body.idea,
            group_ID: req.body.group_ID,
            vote_val: req.body.vote_val
        }).then(function(dbIdeas) {
        // We have access to the new user as an argument inside of the callback function
        res.json(dbIdeas);
        });
    });
}

module.exports = iDecideDBRoutes;