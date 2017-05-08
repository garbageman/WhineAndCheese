UserManager.setUserLink();

$("#searchButton").click(function() {
  let query = $("#searchBar").val();
  let items = query.split(" & ");
  let str = "searchResult.html?item1=";
  if (items.length > 0) {
    str = str + items[0].replace(" ","+").trim();
    if (items.length > 1) {
      str =  str + "&item2="+ items[1].replace(" ","+").trim();
    }
  }
  window.location.href = str;
});

var handle = function(e) {
  if(e.keyCode === 13){
    e.preventDefault();
    let query = $("#searchBar").val();
    let items = query.split(" & ");
    let str = "searchResult.html?item1=";
    if (items.length > 0) {
      str = str + items[0].replace(" ","+").trim();
      if (items.length > 1) {
        str =  str + "&item2="+ items[1].replace(" ","+").trim();
      }
    }
    window.location.href = str;
  }
};

$("#logoutLink").click(function() {
  UserManager.logout();
  UserManager.setUserLink();
  $("#logoutLink").css("display","none");
});
