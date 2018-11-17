window.onload = function () {


  var count = 0;

  // var buttona = $(".add");
  // var buttonr = $(".remove");

  $(document).on("click", ".add", function () {
    let ideaId = $(this).attr("data-idea-id");

    $(this).parent().addClass("orange");
    
    count += 1;
    $(this).parent().find(".user-counter").text(count);
    console.log("Click me: " + count);
    console.log(ideaId);

    getCurrentVoteVal(ideaId);
    maxNumberOfVotesForGroup();
    displayButtonToWinningIdeaPage();

    if (count > 5) {
      count = 5;
      $(this).parent().find(".vote-status").text("Exceded Alotted Votes");
    
    } else {
      $(this).parent().find(".vote-status").text("");
    }
  });

  $(document).on("click", ".remove", function () {
    let ideaId = $(this).attr("data-idea-id");
    count -= 1;
    $(this).parent().find(".user-counter").text(count);
    console.log("Click me: " + count);
    outCurrentVoteVal(ideaId);
    if (count < 0) {
      count = 0;
      $(this).parent().find(".vote-status").text("No Votes for this Idea");
    } else {
      $(this).parent().find(".vote-status").text("");
    }
  });

} // end-window

// let outCurrentVoteVal = (ideaId) => {

//   $.ajax({
//     url: "/api/ideas/" + ideaId,
//     method: "GET"
//   })
//     .then(function (data) {
// console.log("voting data: " + data);
//       let currentVoteVal = data.vote_val;
//       console.log("Current Vote_val " + currentVoteVal);

//       let newVoteVal = currentVoteVal - 1;
//       console.log("New Vote_val " + newVoteVal);

//       updateVoteValInDB(ideaId, newVoteVal);

//     });

// }




// window.onload = function(){


//   var count = 0;

//   var buttona = $(".add");
//   var buttonr = $(".remove");

//   buttona.on("click", function() { 
    
//     count += 1;
//     $(".user-counter").text(count);
//     console.log("Click me: " + count);

//     if (count > 5) {
//         count = 5;
//       alert("No more votes left - this ain't Florida!");
//     }
//   });

//   buttonr.on("click", function () {
//     count -= 1;
//     $(".user-counter").text(count);
//     console.log("Click me: " + count);

//     if (count < 0) {
//       count = 0;
//       alert("You can't vote this way - no matter what...");
//     }
//   });


  
// } // end window

// $("body").on("click", ".add-vote", function (event) {
//   let ideaId = $(this).attr("data-idea-id");
//   getCurrentVoteVal(ideaId);

//   $(this).addClass("orange");

//   $(this).find(".multi-vote").css("display", "block");

//   $(this).find(".act-q").css("border-left", "5px solid #2c2f4d");

// }); // end click func


// // displayGroupInfo
// $.ajax({
//   url: "/api/groups/",
//   method: "GET"
// })
//   .then(function (response) {
//     renderHandlebarsTemplate(".gn", "#group-ideas-display-template", { group: response[0].group_name });


//   })// displayGroupInfo

// // display decideOnInfo
// $.ajax({
//   url: "/api/groups/",
//   method: "GET"
// })
//   .then(function (response) {

//     renderHandlebarsTemplate(".gi", "#group-ideas-display-template", { groupIdea: response[0].decide_on });

//   })// display decideOnInfo