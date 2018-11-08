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
