"use strict";

var ReviewService = {
  pairingReviews: function(wine,cheese) {

  },
  userReviews: function(user) {

  },
  createReview: function(user, wine, cheese, review, rating) {
    // Information has already been validated
    /* Create a credentials json for validation */
    let searchParams = {
        "user": user,
        "wine": wine,
        "cheese": cheese,
        "review": review,
        "rating": rating
    };

    /* Create a promise that resolves when the ajax query for validation works */
    return new Promise((resolve, reject) => {
        $.ajax({
            url: CONFIG.baseTestURL + "AddReview.php",
            data: searchParams,
            dataType: "json",
            contentType: "application/json"
        }).done(function (response) {
            console.log(response);
            // resolve(JSON.parse(response));
            resolve(response);
        }).error(function (err) {
            reject(err);
        });
    });
  }
}
