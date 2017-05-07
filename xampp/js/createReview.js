
UserManager.validate().then(function(response) {
  // Not logged in
  if (!response.result) {
    window.location.href="login.html?redirect=createReview";
  } else {
  	
  }
});