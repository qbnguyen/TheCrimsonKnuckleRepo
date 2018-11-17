window.onload = function(){


  var count = 0;

  var buttona = $(".add");
  var buttonr = $(".remove");


alert("this one is orange");
  buttona.on("click", function() { 

    count += 1;
    $(".user-counter").text(count);
    console.log("Click me: " + count);

    if (count > 5) {
        count = 5;
      alert("No more votes left - this ain't Florida!");
    }
  });

  buttonr.on("click", function () {
    count -= 1;
    $(".user-counter").text(count);
    console.log("Click me: " + count);

    if (count < 0) {
      count = 0;
      alert("You can't vote this way - no matter what...");
    }
  });


  
} // end window

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