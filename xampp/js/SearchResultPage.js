/**
 * Created by Christopher on 5/5/2017.
 */
"use strict";

main();

/*
 * The following functions are employed to parse the raw string data from the webservice
 * and create an array of pairings, sorted in descending order of highest rating.
 */

/*
 * This class represents a pairing.
 */
function Pairing(wine, cheese, numReviews, rating) {
    this.wine = wine;
    this.cheese = cheese;
    this.numReviews = Number(numReviews);
    this.rating = Number(rating);
}

/*
 * This function takes in a JSON string of all pairing results and constructs a list of
 * pairing objects.
 */
function buildPairings(serviceInfo) {
    let pairings = [];
    for (let components of serviceInfo) {
        let pairing = new Pairing(components['wine'], components['cheese'], components['num_reviews'], components['rating']);
        pairings.push(pairing);
    }

    //Sort pairings in descending order by rating
    pairings.sort(function(p1, p2) {return p2.rating - p1.rating});

    return pairings;
}

function displayResults(pairings) {

    let results = document.getElementById("results");
    let id = 0;
    for (let pairing of pairings) {
        results.innerHTML += "<div class='row searchrow hover' id='result" + id + "'>";

        let row = document.getElementById("result" + id);
        row.innerHTML = "<span class='col-lg-8 pairing'>" + pairing['wine'] + " & " + pairing['cheese'] + "</span>";
        row.innerHTML += "<span class='col-lg-2 rating'>Rating: " + pairing['rating'] + "</span>";
        row.innerHTML += "<span class='col-lg-2 numReviews'>Reviews: " + pairing['numReviews'] + "</span>";

        results.innerHTML += "</div>";
        id++;
    }

    for (let i = 0; i < pairings.length; i++) {
        let handle = document.getElementById("result" + i);
        // document.getElementById("result" + i).onclick = function() { { relocate(pairings[i].wine, pairings[i].cheese)}; };
        handle.onclick = function() { { relocate(pairings[i].wine, pairings[i].cheese)} };
    }
}

function relocate(wine, cheese) {

    let url = "pairing.html"; //CONFIG.baseTestURL + "pairing.html";
    let params = ("?wine=" + wine + "&" + "cheese=" + cheese).replace(" ", "+");

    window.location.href = url + params;
}

function main() {
    searchService.validateSearch(CONFIG.QueryString()["item1"], CONFIG.QueryString()["item2"]).then(function (result) {
        // let parsed = JSON.parse(result);
        let pairings = buildPairings(result);
        displayResults(pairings);
    });
    UserManager.setUserLink();
    $("#logoutLink").click(function() {
      UserManager.logout();
      UserManager.setUserLink();
      $("#logoutLink").css("display","none");
    });
}
