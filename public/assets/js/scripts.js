// Initialize all of the Materialize Components.
// You cannot pass in options using this method.
M.AutoInit();


////////////////////////////////////////////////////////// Functions ////////////////////////////////////////////////////////////////

//This function GETs group information based on the password.
let getGroupByPassword = (groupPassword) => {
  $.get("/api/groups/password/" + groupPassword, function(data, status){
    // console.log("Data: " + data.id + "\nStatus: " + status);
    //HERE IS OUR ONE LINE OF CODE THAT REDIRECTS US TO A NEW LOCATION.
    //THE VALUE OF location.href CAN ALSO BE A URL.
    location.href = "/ideas/group/#" + data.id;
    //THIS could be a potential solution to render ideas
    // $(window).on("load", getAllIdeasForTheGroup(data.id));
    //Simpler solution if it works.
    // getAllIdeasForTheGroup(data.id)
  });
}

//This function queries the ideas in the database based on the group id in the URL.
//This function should just return true or false based on the number of ideas in that group
//We want to make sure that there is a certain number of ideas in the idea table assigned to 
//this group before we allow users to enter the voting section. 
let countNumberOfIdeasInGroup = (participants) => {

  let groupID = location.hash.substr(1);

  $.ajax({
    url: "/api/ideas/groups/" + groupID, //CHANGED TO TAKE IN PARAMETER INSTEAD OF HARD CODED.
    method: "GET"
})
.then(function (data) {

  if (data.length >= participants * 5) { // Make sure there is a 5:1 ration of ideas to participants before starting voting
    buttontoEnterVoting();
  } else {
    console.log("sorry! not enough ideas in group to enter voting");
  }

});
  
}

//This function is going to GET the total number of votes each group participant gets and to determine what
//will be the number of votes present when all group members have voted. This will be used in the showButtonToWinningIdeaPage
//function to display that button only after all team members have used all their votes.
let maxNumberOfVotesForGroup = () => {
  let groupID = location.hash.substr(1);

  $.ajax({
    url: "/api/groups/" + groupID, //CHANGED TO TAKE IN PARAMETER INSTEAD OF HARD CODED.
    method: "GET"
})
.then(function (data) {
  let maxVotes = data.number_of_participants * data.votes;
  console.log(maxVotes);
  totalNumberofVotesInGroup(maxVotes); // passing maxVotes into this function so that it can be used in the promise of this function to render button on page
  countNumberOfIdeasInGroup(data.number_of_participants); // passing number of people in group into this function so that logic can be build to render the button to move to voting from the idea page
});

}

//This function find how many votes have been cast in the group. This value is important for the logic being used to 
//render the button that takes the user to the winnig idea page via the displayButtonToWinningPage function.
//the param here (max) is just being passed in from the maxNuberOfVotesForGroup function so that it can be used in the 
//displayButtonToWinningPage function
let totalNumberofVotesInGroup = (max) => {

  let groupID = location.hash.substr(1);
  let numberOfVotes = 0;

  $.ajax({
    url: "/api/ideas/groups/" + groupID, //CHANGED TO TAKE IN PARAMETER INSTEAD OF HARD CODED.
    method: "GET"
})
.then(function (data) {
  
  for (let i = 0; i < data.length; i++) {
    numberOfVotes += data[i].vote_val;
  }
  console.log(numberOfVotes);
  displayButtonToWinningIdeaPage(max, numberOfVotes);
});

}



//This functions only job is to build a button that can dynamically put on the page
//to take the user to the voting page.
let buttontoEnterVoting = () => {
  let button = $("<a>")
                .addClass("waves-effect waves-light btn enter-voting-page")
                .append("Enter Voting Page");
    
    $(".voting-page-button-location").empty("");
    $(".voting-page-button-location").append(button);
}

//This functions only job is to build a button that can dynamically put on the page
//to take the user to the winning idea page.
let buttontoSeeWinner = () => {
  let button = $("<a>")
                .addClass("waves-effect waves-light btn enter-winning-idea-page")
                .append("See Winning Idea!!!");
    
    $(".winning-idea-page-button-location").empty("");
    $(".winning-idea-page-button-location").append(button);
}


//This function makes sure that, based on the number of users in the group, everyone has casted a vote on an idea 
//before someone can go see the winning votes.
let displayButtonToWinningIdeaPage = (max, total) => {
  if (total >= max) {
      buttontoSeeWinner();
  }
}

// Load the ideas from localstorage.
// We need to use JSON.parse to turn the string retrieved  from an array into a string
var list = JSON.parse(localStorage.getItem("ideaslist"));

if (!Array.isArray(list)) {
  list = [];
}

// THis function displays submitted ideas on the page as user creates them
function renderIdeas(list) {
  $(".display-ideas").empty(); // empties out the html

  // render our ideas to the page
  for (var i = 0; i < list.length; i++) {

    var newIdeaCard = $("#template").clone();

    newIdeaCard.attr("data-ideas", i);
    newIdeaCard.find('p').text(list[i]);

    $(".display-ideas").append(newIdeaCard);
  }
}



let postIdeaToDatabase = (idea) => {
  $.post("/api/ideas", idea)
    .then(function(data) {
      console.log("Idea successfully Posted to DB");
    });
}

let createIdeaObject = (ideaFromForm, postIdeaToDatabase) => {
  let groupID = location.hash.substr(1);
  
  idea = {
    idea: ideaFromForm,
    vote_val: 0,
    GroupId: groupID
  };

  postIdeaToDatabase(idea);
}


let addIdeaToLocalStorage = () => {

// Get the idea "value" from the textbox and store it as a variable
var newIdea = $("#input_text").val().trim();

//Create Idea Object for Posting to Database
createIdeaObject(newIdea, postIdeaToDatabase);     

// Adding our new ideas to our local list variable and adding it to local storage
list.push(newIdea);

// Update the ideas on the page
renderIdeas(list);

// Save the ideas into localstorage.
// JSON.stringify turns the list from an array into a string
localStorage.setItem("ideaslist", JSON.stringify(list));

// Clear the textbox when done
$("#input_text").val("");



}









//This function GETs all ideas for a group so that the data can be passed to handlebars to render them on the page.
let getAllIdeasForTheGroup = () => {
  
  let groupID = location.hash.substr(1);

  $.ajax({
      url: "/api/ideas/groups/" + groupID, //CHANGED TO TAKE IN PARAMETER INSTEAD OF HARD CODED.
      method: "GET"
  })
  .then(function (data) {
    
      renderHandlebarsTemplate(".display-ideas", "#group-ideas-display-template", {idea: data});
      
  });
}

//This Function takes the data from the API and uses handlebars to display on screen
let renderHandlebarsTemplate = (displayClass, templateId, data) => {
  let source = $(templateId).text();
  let template = Handlebars.compile(source);
  let html = template(data);
  $(displayClass).html(html);
}

//This function is GETing the current vote_value from the db of the idea that's clicked 
//It's then adding 1 to that value and passing that new value into the updateVoteValInDB function that will
//then update the vote_val in the db with the new value. 
//This function is called in the click handler below.
let getCurrentVoteVal = (ideaId) => {

  $.ajax({
    url: "/api/ideas/" + ideaId,
    method: "GET"
})
.then(function (data) {
  
 let currentVoteVal = data.vote_val;
 console.log("Current Vote_val " + currentVoteVal);
 let newVoteVal = currentVoteVal + 1;  
console.log("New Vote_val " + newVoteVal);

updateVoteValInDB(ideaId, newVoteVal);

});

}

//This function just updates the vote_value in the db of an idea that's been "voted for." This function is called in the 
//the promise of the getCurrentVoteVal function above. 
let updateVoteValInDB = (ideaId, newVoteVal) => {

  $.ajax({
    url: "/api/ideas/" + ideaId,
    method: "PUT",
    data: {
      vote_val: newVoteVal
    }
})
.then(function (data) {});
}

//This function is Getting all the ideas from a group and pushing their vote_vals into an array.
//This makes it easy to use Math.max() to find out what the largest vote_vale is.
let findIdeaWithMostVotes = () => {
  let groupID = location.hash.substr(1);
  let voteValArr = [];
  $.ajax({
    url: "/api/ideas/groups/" + groupID, //CHANGED TO TAKE IN PARAMETER INSTEAD OF HARD CODED.
    method: "GET"
})
.then(function (data) {
  // console.log(data);

      for (let i = 0; i < data.length; i++) {
        voteValArr.push(data[i].vote_val);
      }
  let maxVoteVal = Math.max(...voteValArr); 
    displayIdeasWithMostVotes(maxVoteVal);
});

}

//This function call an api endpoint that allows you to GET ideas by theire vote_val. I'm passing the max vote_val  from the 
// function findIdeaWithMostVotes function above so that handlebars can be used in this function to display that idea on the page.
let displayIdeasWithMostVotes = (maxVoteVal) => {
  let groupID = location.hash.substr(1);

  $.ajax({
    url: "/api/ideas/groups/" + groupID + "/votes/" + maxVoteVal, //CHANGED TO TAKE IN PARAMETER INSTEAD OF HARD CODED.
    method: "GET"
})
.then(function (data) {
  renderHandlebarsTemplate(".display-winner", "#group-winner-display-template", {idea: data});
});
}





//This function receives the group object and then posts it to the /api/groups route.
let postGroupInformation = (group) => {
  $.post("/api/groups", group)
    .then(function(data) {
      // console.log(data);
      getGroupByPassword(data.password);
    });
}

//This function GETs group information based on the ID, and then RENDERS HANDLEBARS for our ideas page.
let getGroupAndRenderHandlebars = (idOfGroup) => {
  $.get("/api/groups/" + idOfGroup, function(data, status){
    console.log("group name: " + data.group_name + "\nPrompt: " + data.decide_on + "\nStatus: " + status);
    renderHandlebarsTemplate(".display-group-name", "#group-name-display-template", {group_name: data.group_name});
    renderHandlebarsTemplate(".display-group-body", "#group-body-display-template", {group_name: data.group_name, decide_on:data.decide_on});
  });
}


//////////////////////////////////////////////////////Click Handlers/////////////////////////////////////////////////////////////////////////


// This click handler is GETing the vote_val from the db of the idea that's being clicked on.
// It is also updating (+1) that vote val of that idea and updating the value in the db.
$("body").on("click", ".add-vote", function(event){
  event.preventDefault();
  let ideaId = $(this).attr("data-idea-id");
  getCurrentVoteVal(ideaId);
  maxNumberOfVotesForGroup();
  displayButtonToWinningIdeaPage();
});

// Toggle the little dropdown arrows in the sidenav
$(".tog-button").on("click", function () {
  if ($(".tog-arrow").css("transform") == "none") {
    $(".tog-arrow").css({ "transform": "rotate(180deg)" });
  } else {
    $(".tog-arrow").css({ "transform": "" });
  };
})

// Smoothscroll from W3Schools
$("a").on('click', function (event) {

  // Make sure this.hash has a value before overriding default behavior
  if (this.hash !== "") {
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function () {

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  } // End if
});

//This function handles taking information from input fields and creating an object
//to post in our groups table.
$("body").on("click", ".createGroup", function(event){
  var groupToPost = {
    admin_name:$("#admin_name").val().trim(),
    admin_email:$("#admin_email").val().trim(),
    decide_on:$("#decide_on").val().trim(),
    group_name:$("#group_name").val().trim(),
    number_of_participants: $("#participants").val().trim(),
    password:$("#password_create").val().trim(),
  };
  postGroupInformation(groupToPost);
  
  //Used for testing so that I do not have to post groups to check if function is working
  // getGroupByPassword("8769341a");
});

//This function handles clicking the joingroup button, which uses the password from the input to
//GET the group ID by password.
$("body").on("click", ".joinGroup", function(event){
  var password = $("#passSearch").val().trim()
  getGroupByPassword(password);
});

//This click handler is going to be doing a number of things...
//1. POSTING IDeas to the DB when clicked
//2. Displaying ideas on the page as the user adds their ideas
//3. counting the number of ideas in the db and displaying a button on the page to move the user to the voting page
$("body").on("click", ".submit-idea", function(event){
  event.preventDefault();
  addIdeaToLocalStorage();
  maxNumberOfVotesForGroup();
  countNumberOfIdeasInGroup();
});

//This click handler is for the button that appears on the page to take the user to the voting page.
//it uses location.href to take them to the correct group voting page.
$("body").on("click", ".enter-voting-page", function(event){
  let groupID = location.hash.substr(1);

  location.href = "/voting/group/#" + groupID;

});


//Once the button to go to the winning idea page is available, once clicked, this takes them to the seee the 
//idea with the most votes for the group
$("body").on("click", ".enter-winning-idea-page", function(event){
    let groupID = location.hash.substr(1);
    location.href = "/winning/group/#" + groupID;
});


// When a user clicks a check box then delete the specific content
$("body").on("click", "#delete-idea", function() {
  // Get the number of the button from its data attribute and hold in a variable called  ideaNumber.
  var ideaNumber = $(this).attr("data-ideas");

  // Deletes the item marked for deletion
  list.splice(ideaNumber, 1);

  // Update the ideas on the page
  renderIdeas(list);

  // Save the ideas into localstorage.
  // We need to use JSON.stringify to turn the list from an array into a string
  localStorage.setItem("ideaslist", JSON.stringify(list));
});


//Not sure what to do with this right now
$("submit-all").on("click", ".checkbox", function() {
  function clearAll() {
  window.localStorage.clear();
}

});


//This function waits for every page to be loaded, and if there is a hash, it grabs the groupID from it
//and passes it into the getGroupAndRenderHandlebars, which GETS the group information by ID and then 
//renders the group name and prompt using handlebars on our ideas.html page.
//This function only renders handlebars if there is a hash in the URL, and also if there are the corresponding
//Classes and IDs that are ready to be used for handlebars.
$( document ).ready(function() {
  let groupID = location.hash.substr(1);
  getGroupAndRenderHandlebars(groupID);

//This functions renders all the ideas from a particular group on the voting page.
getAllIdeasForTheGroup();

//This is the function that displays the winning idea on the page
findIdeaWithMostVotes();

// render our ideas on the idea submission page from localstorage
renderIdeas(list);

});


function createHTML(){
  console.log(req.user)
}
