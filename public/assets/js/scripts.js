// Initialize all of the Materialize Components.
// You cannot pass in options using this method.
M.AutoInit();

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


//This function GETs all ideas for a group so that the data can be passed to handlebars to render them on the page.
let getAllIdeasForTheGroup = (groupId) => {

  $.ajax({
      url: "/api/ideas/groups/2", //This GroupId (2) is hardcoded for testing and will need to be programatically added.
      method: "GET"
  })
  .then(function (data) {
    console.log(data);
      renderHandlebarsTemplate({idea: data});
  });
}

//This Function takes the data from the API and uses handlebars to display on screen
let renderHandlebarsTemplate = (data) => {
  let source = $("#group-ideas-display-template").text();
  let template = Handlebars.compile(source);
  let html = template(data);
  $(".display-ideas").html(html);
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
.then(function (data) {
  console.log(data);

});

}

//This functions renders all the ideas from a particular group on the voting page.
getAllIdeasForTheGroup();

$("body").on("click", ".add-vote", function(event){
  let ideaId = $(this).attr("data-idea-id");
  getCurrentVoteVal(ideaId);
});


