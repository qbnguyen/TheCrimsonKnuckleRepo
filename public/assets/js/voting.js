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
