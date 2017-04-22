/* This manages the cookie that keeps the user logged in */
/* Creating a separate manager for this might be overkill,
but whatever */
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var UserManager = {
  login : function(user,key) {
    document.cookie = "username=" + user + ";";
    document.cookie = "key=" + key + ";";
  },
  logout : function() {
    document.cookie = "username=;";
    document.cookie = "key=;";
  },
  validate : function() {
    var username = getCookie("username");
    var key = getCookie("key");
    return userService.validateSession(username,key);
  },
  user : function() {
    return getCookie("username");
  },
  key : function() {
    return getCookie("key");
  },
  setUserLink : function() {
    /* Check if the user is logged in, if so, set the link to the username */
    var username = getCookie("username");
    var key = getCookie("key");

    userService.validateSession(username,key).then(function(response) {
      if (response.result) {
        $("#loginLink").text(UserManager.user());
      }else {
        $("#loginLink").text("Login");
      }
    });
  }
};
