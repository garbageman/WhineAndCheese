
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


// Section for adding into database on submit.

$("#submit").click(function() {
	console.log("submitted");

});

// document.getElementById("slideShow").onclick = viewer.getArrayPhotosNames;
