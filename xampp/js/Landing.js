UserManager.setUserLink();

$("#searchButton").click(function() {
  var query = $("#searchBar").val();
  console.log(query);
  var items = query.split(" & ");
  // Figure out if wine
  window.location.href = "SearchResultPage.html?item1=" + items[0].replace(" ","+").trim() + "&item2="+ items[1].replace(" ","+").trim();
});

// Function that creates the innerHTML of
var createThumbnail = function(wine, cheese) {

};
