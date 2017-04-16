
/* The state of the page is that someone is trying to log in by default */
var login = true;

$("#toggleButton").click(function() {
  if (login) {
    login = false;
    $("#loginLabel").text("Sign Up");
    $("#toggleButton").attr("value","Login");
    $("#confirmForm").attr("value","Sign Up");
    $("#confirmPassword").css("display","table-cell");
  } else {
    login = true;
    $("#loginLabel").text("Login");
    $("#toggleButton").attr("value","Sign Up");
    $("#confirmForm").attr("value","Login");
    $("#confirmPassword").css("display","none");
  }
});

/* When the form is submitted */
$("form#loginForm").submit(function() {
  /* There is definitely an easier way to do this */
  // console.log("what's going on");
  var username = $("#username").val();
  var password = $("#password").val();

  if (login) {
    /* If we are logging in, simply validate the user */
    userService.validateLogin(username,password).then(function(response) {
      /* The username and key are stored in here */
      if (response.username != "") {
        /* The login was valid */
        UserManager.login(response.username, response.key);
      } else {
        /* Maybe error message goes here ? */
        
      }
    }).catch(function(error) {
      console.log(error);
    })

  } else {
    /* If we are signing up, validate the input and then */
    /* make a sign up request */

  }
});

UserManager.setUserLink();
