/* This config file is basically just a huge JSON */
/* it will store most of the information that we use */
/* for db connections etc. */

var CONFIG = {};

CONFIG.baseTestURL = "services/";
//CONFIG.baseTestURL = "buttheadchris"
CONFIG.AuthenticationURL = "Authentication.php";
CONFIG.cheeseURL = "services/cheeseImage.php";
CONFIG.wineURL = "services/wineImage.php";
CONFIG.QueryString = () => {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  //console.log(query_string);
  return query_string;
};
