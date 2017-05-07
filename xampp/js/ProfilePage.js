
/* First check if the user exists */
var user = CONFIG.QueryString()['user'];

userService.validateUsername(user).then(function(response) {
  //console.log(response);
  if (response.result) {
    $("#username").text(user);
  } else {
    $("#username").text("This User doesn't exist!");
  }
});
/* Check if the user is the one currently logged in */
$("#logoutButton").click(function() {
  UserManager.logout();
})
