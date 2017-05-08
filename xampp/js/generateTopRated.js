/**
 * Created by Christopher on 5/7/2017.
 */
"use strict";

main();

function generateBest(topRatings) {
    let id = 0;
    let ratings = document.getElementById("top_rated");
    for (let pairing of topRatings) {
        ratings.innerHTML += "<div id='outer" + id + "' class='col-lg-4 thumbnail-col'></div>";
        document.getElementById("outer"+id).innerHTML += "<div id='thumbnail" + id + "' class='thumbnail'></div>";
        let thumbnail = document.getElementById("thumbnail"+id);
        thumbnail.innerHTML += "<div id='header" + id + "' class='thumbnail-header'></div>" +
            "<div id='rating" + id + "' class='thumbnail-rating'></div>";
        document.getElementById("header"+id).innerHTML += pairing['wine'] + " & " + pairing['cheese'];
        document.getElementById("rating"+id).innerHTML += "Rating: " + pairing['rating'];
        id++;
    }

    for (let i = 0; i < topRatings.length; i++) {
        document.getElementById("outer"+i).onclick = function() { relocate(topRatings[i].wine, topRatings[i].cheese) };
    }
}

function relocate(wine, cheese) {

    let url = "pairing.html";
    let params = ("?wine=" + wine + "&" + "cheese=" + cheese).replace(" ", "+");

    window.location.href = url + params;
}

function main() {
    searchService.topRated().then(function (result) {
        // let parsed = JSON.parse(result);let pairings = buildPairings(result);
        generateBest(result);
    });


}