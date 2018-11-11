let db = require("../models");

let iDecideDBRoutes = (app) => {

//////////////// POST ROUTES //////////////////////////

    // POST route for saving a new group
    app.post("/api/groups", function(req, res) {
        console.log(req.body);
        db.Groups.create({
            admin_name: req.body.admin_name,
            admin_email: req.body.admin_email,
            group_name: req.body.group_name,
            decide_on: req.body.decide_on,
            time: req.body.time,
            votes: req.body.votes,
            password:req.body.password
        }).then(function(dbGroups) {
            res.json(dbGroups);
        });
    });

    // POST route for saving a new user
    app.post("/api/users", function(req, res) {
        console.log(req.body);
        db.Users.create({
            name: req.body.name,
            email: req.body.email,
            GroupId: req.body.GroupId
        }).then(function(dbUsers) {
            res.json(dbUsers);
        });
    });

    // POST route for saving a new idea
    app.post("/api/ideas", function(req, res) {
        console.log(req.body);
        db.Ideas.create({
            idea: req.body.idea,
            vote_val: req.body.vote_val,
            GroupId: req.body.GroupId
        }).then(function(dbIdeas) {
            res.json(dbIdeas);
        });
    });

//////////////// GET ROUTES //////////////////////////


//Get all groups

app.get("/api/groups/", function(req, res) {
        console.log(req.body);
        db.Groups.findAll({}).then(function (Group) {
        res.json(Group);
    })
});


//Get group by id

app.get("/api/groups/:id", function(req, res) {
        console.log(req.body);
        db.Groups.findOne({
            where: {
                id: req.params.id
            },
    }).then(function (Group) {
        res.json(Group);
    })
});

//GET all ideas regardless of group
app.get("/api/ideas", function(req, res) {
        console.log(req.body);
        db.Ideas.findAll({}).then(function (Ideas) {
        res.json(Ideas);
    })
});

//GET all ideas based on group id

app.get("/api/ideas/groups/:id", function(req, res) {
        console.log(req.params);
        db.Ideas.findAll({
            where: {
                GroupId: req.params.id
            }
        }).then(function (Ideas) {
        res.json(Ideas);
    })
});

//GET ideas from group based on number of votes
app.get("/api/ideas/groups/:id/votes/:maxvotes", function(req, res) {
        console.log(req.params);
        db.Ideas.findAll({
            where: {
                GroupId: req.params.id,
                vote_val: req.params.maxvotes
            }
        }).then(function (Ideas) {
        res.json(Ideas);
    })
});

//find all users based on group id
app.get("/api/users/groups/:id", function(req, res) {
        console.log(req.params);
        db.Users.findAll({
            where: {
                GroupId: req.params.id
            }
        }).then(function (Users) {
        res.json(Users);
    })
});

//GET one idea from a group based on that idea's id 
app.get("/api/ideas/:idea_id", function(req, res) {
        console.log(req.params);
        db.Ideas.findOne({
            where: {
                id: req.params.idea_id
            }
        }).then(function (ideas) {
        res.json(ideas);
    })
});

//////////////// PUT ROUTES //////////////////////////

app.put("/api/ideas/:idea_id", function(req, res) {
    db.Ideas.update({
        vote_val: req.body.vote_val
        },
        {
         where: {
             id: req.params.idea_id
        }

    }).then(function(ideas) {
        res.json(ideas);
    })

});

}

module.exports = iDecideDBRoutes;