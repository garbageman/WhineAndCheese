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
    /* Check that the username and key are valid */
    /* We will return a promise because there will be */
    /* an asynchronous call to the api later */
    return new Promise((resolve,reject) => {
      var username = getCookie("username");
      var key = getCookie("key");
      if (username == "" || key == "") {
        reject("Username or Key not set");
      }
      /* Eventually if both have a value, */
      /* make a call to LoginService to validate */
      resolve(true);
    });
  },
  user : function() {
    return getCookie("username");
  },
  key : function() {
    return getCookie("key");
  },
  setUserLink : function() {
    /* Check if the user is logged in, if so, set the link to the username */
    this.validate().then(function(isLoggedIn) {
      /* If the user is logged in, then set the login link */
      /* eventually change the ref to the user profile */
      /* Maybe add a logout */
      if (isLoggedIn) {
        $("#loginLink").text(UserManager.user());
      } else {
        $("#loginLink").text("Login");
      }
    }).catch(function(reason) {
      /* Not handling this error yet */
      console.log(reason);
    });
  }
};
