/* This is a service that allows for validation that a login */
/* is correct and other various user Services */

var userService = {
  validateLogin : function(user,password) {
    return new Promise((resolve, reject) => {
      /* This is a hard coded login for now, we only accept */
      /* one user and password */
      if (user == "dnagle" && password == "butts") {
        resolve({
          username : "dnagle",
          key : "butts"
        });
      } else {
        reject();
      }
    });
  },
  signUp : function(user,password) {
    /* This should eventually do something useful but it doesn't right now */
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }
};
