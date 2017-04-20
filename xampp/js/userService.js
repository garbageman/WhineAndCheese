/* This is a service that allows for validation that a login */
/* is correct and other various user Services */

var userService = {
  validateLogin : function(user,password) {
    /* Create a credentials json for validation */
    var credentials = {
      "username" : user,
      "password" : password
    };

    /* Create a promise that resolves when the ajax query for validation works */
    return new Promise((resolve, reject) => {
      $.ajax({
        url : CONFIG.baseTestURL + "LoginService.php",
        data : credentials
      }).done(function(response) {
        resolve(response);
      }).error(function(err) {
        reject(err);
      });
    });
  },
  signUp : function(user,password) {
    /* This should eventually do something useful but it doesn't right now */
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  },
  testREST : function() {
    var testData = {
        wine : "dnagle",
        cheese : "butts"
    };

    return new Promise((resolve,reject) => {
      $.ajax({
        url : CONFIG.baseTestURL + "LoginService.php",
        data : testData
      }).done(function(response) {
        resolve(response);
      });
    });
  }
};
