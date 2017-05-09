
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
$("#confirmForm").click(function() {
  /* Since the default action is to move to the next page */
  /* Prevent the default actions */
  var form = this;

  /* There is definitely an easier way to do this */
  // console.log("what's going on");
  var username = $("#username").val();
  var password = $("#password").val();
  var checkPass = $("#confirmPassword").val();

  if (login) {
    /* If we are logging in, simply validate the user */
    userService.validateLogin(username,password).then(function(result) {
      console.log(result);
      /* The username and key are stored in here */
      if (result.username != "") {
        /* The login was valid */
        UserManager.login(result.username, result.key);
      } else {
        /* Maybe error message goes here ? */
        console.log("username wasn't set");
      }
      UserManager.validate().then(function(response) {
              if (response.result) {
                if ((CONFIG.QueryString().wine !== undefined) || (CONFIG.QueryString().cheese !== undefined)) {
                  window.location.href = 'createReview.html?wine=' + CONFIG.QueryString().wine + "&cheese=" + CONFIG.QueryString().cheese;
                } else {
                  window.location.href = 'index.html'; 
                }
                
              }
      });
    });

  } else {
    /* If we are signing up, validate the input and then */
    /* make a sign up request */
    if (password == checkPass) {
      /* Go through signup process */
      userService.signUp(username,password).then(function(result) {
        if (result.result) {

          userService.validateLogin(username,password).then(function(result) {
            console.log(result);
            /* The username and key are stored in here */
            if (result.username != "") {
              /* The login was valid */
              UserManager.login(result.username, result.key);
            } else {
              /* Maybe error message goes here ? */
              console.log("username wasn't set");
            }
            // Check if the user is logged in, if so, redirect to landing page
            UserManager.validate().then(function(response) {
              if (response.result) {
                if ((CONFIG.QueryString().wine !== undefined) || (CONFIG.QueryString().cheese !== undefined)) {
                  window.location.href = 'createReview.html?wine=' + CONFIG.QueryString().wine + "&cheese=" + CONFIG.QueryString().cheese;
                } else {
                  window.location.href = 'index.html'; 
                }
                
              }
            });
          });

        } else {
          /* I have no idea what error this should be */
          $("#error").css("display","block");
          $("#error").text(result.message);
        }
      })
    }
  }
});

UserManager.setUserLink();
