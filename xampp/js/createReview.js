
UserManager.validate().then(function(response) {
  // Not logged in
  if (!response.result) {
    window.location.href="login.html?redirect=createReview";
  } else {

  }
});

// Obtains wine and cheese in URL
var wine = CONFIG.QueryString()['wine'];
var cheese = CONFIG.QueryString()['cheese'];

var cheeseURL = CONFIG.cheeseURL;
var wineURL = CONFIG.wineURL;

var cheeseConcat = CONFIG.cheeseURL + "?cheese=" + cheese;
var wineConcat = CONFIG.wineURL + "?wine=" + wine;

$("#image1").attr("src", wineConcat);
$("#image3").attr("src", cheeseConcat);
$("#wineAndCheese").text(wine + " & " + cheese);

$("#clear").click(function() {
	console.log("cleared");
	$("#rating1").prop("checked", true);
});


function getRating() {
  let i = 1;
  for (; i <= 5;i++) {
    if ($("#rating" + i).is(":checked")) {
      return i;
    }
  }
  return 0;
}

document.getElementById("rating1").onclick = function() {
	document.getElementById("ratingText").innerHTML = "Only when I am wasted";
}
document.getElementById("rating2").onclick = function() {
	document.getElementById("ratingText").innerHTML = "Maybe if I'm tipsy";
}
document.getElementById("rating3").onclick = function() {
	document.getElementById("ratingText").innerHTML = "I'd give this to Chris";
}
document.getElementById("rating4").onclick = function() {
	document.getElementById("ratingText").innerHTML =  "Not bad at ALL";
}
document.getElementById("rating5").onclick = function() {
	document.getElementById("ratingText").innerHTML = "The Damien DELIGHT!!!";
}

    	
// Section for adding into database on submit.

$("#submit").click(function() {
	// Validate that the user is still logged in
  UserManager.validate().then(function(response) {
    // The user is logged in
    if (response.result == true) {
      // Then we feel safe getting the info
      var review = $("#review").val().replace(" ","+");
      var rating = getRating();
      var user = UserManager.user();
      ReviewService.createReview(user,wine,cheese,review,rating).then(function(response) {
        var res = JSON.parse(response);
        if (res.result) {
          console.log("we tried");
          window.location.replace("pairing.html?wine="+wine+"&cheese="+cheese);
        } else {
          // error message if fails
        }
      });
    }
  });

});

UserManager.setUserLink();
