UserManager.setUserLink();

$("#searchButton").click(function() {
    let items = query.split(" & ");
  // Figure out if wine
    let str = "searchResult.html?item1=";
  if (items.length > 0) {
    str = str + items[0].replace(" ","+").trim();
    if (items.length > 1) {
      str =  str + "&item2="+ items[1].replace(" ","+").trim();
    }
  }
  window.location.href = str;
});

// // Function that creates the innerHTML of
// let createThumbnail = function(wine, cheese) {
//
// };
