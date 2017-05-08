
function Wine (name, info) {
    this.name = name;
    this.info = info;
}

function Review (userName, review, rating) {
    this.userName = userName;
    this.review = review;
    this.rating = rating;
    this.toString = function () {
        return "User: " + this.userName + " Review: " + this.review + " Rating: " + this.rating;
    };
}

function buildReviews (reviewsServiceResult) {
    let reviews = [];
    for (let ele of reviewsServiceResult) {
        reviews.push(new Review(ele['name'], ele['review'], ele['rating']));
    }
    return reviews;
}

function generatePairingInformationSection (sectionId, content) {
    document.getElementById(sectionId).innerHTML = content;
}

function generateReviewsSection (reviews) {
    let reviewSection = document.getElementById("pairing-reviews");
    let id = 0;
    for (let review of reviews) {
        reviewSection.innerHTML += "<div class='row searchrow hover' id='result" + id + "'>";

        let row = document.getElementById("result" + id);
        row.innerHTML = "<span class='col-lg-8 pairing'>User: " + review['userName'] + "</span>";
        row.innerHTML += "<span class='col-lg-2 rating'>Review: " + review['review'] + "</span>";
        row.innerHTML += "<span class='col-lg-2 numReviews'>Rating: " + review['rating'] + "</span>";

        // for (let field in pairing) {
        //     if (pairing.hasOwnProperty(field)) {
        //         row.innerHTML += "<span class='col-lg-3 searchcol " + field + "'>" + pairing[field] + "</span>";
        //     }
        //     id++;
        // }

        reviewSection.innerHTML += "</div>";
        id++;
    }
}

function relocate(wine, cheese) {
    let url = "createReview.html";
    let params = ("?wine=" + wine + "&" + "cheese=" + cheese).replace(" ", "+");
    window.location.href = url + params;
}

main();

function main () {
    let wineName = CONFIG.QueryString()["wine"];
    let cheeseName = CONFIG.QueryString()["cheese"];
    let title = `${wineName} &amp; ${cheeseName}`;
    
    document.getElementById("pairing-title").innerHTML = title;
    document.getElementById("wine-title").innerHTML = wineName;
    document.getElementById("cheese-title").innerHTML = cheeseName;
    document.getElementById("toReviewButton").onclick = function () { relocate(wineName, cheeseName); };
    
    //document.getElementById("wine-info").innerHTML = getInformation(wineName);
    
    InfoService.validateSearch("wine", wineName).then(function (result) {
        let wineInfo = result[0]["information"];
        generatePairingInformationSection("wine-info", wineInfo);
    });
    
    InfoService.validateSearch("cheese", cheeseName).then(function (result) {
        let cheeseInfo = result[0]["information"];
        generatePairingInformationSection("cheese-info", cheeseInfo);
    });
    
    searchService.validateSearch(wineName, cheeseName).then(function (result) {
        let rating = result[0]["avg_rating"];
        console.log("avg rating: " + rating);
    });
    
    grabReviewsService.validateSearch(wineName, cheeseName).then(function (result) {
        //for (let reviews of result) {
        //    //console.log(components["review"]);
        //    let user = reviews["name"];
        //    let review = reviews["review"];
        //    let rating = reviews["rating"];
        //    
        //    console.log("user: " + user);
        //    console.log("review: " + review);
        //    console.log("rating: " + rating);
        //}
        let reviews = buildReviews(result);
        for (let review of reviews) {
            console.log(review.toString());
        }
        generateReviewsSection(reviews);
    });
    
}




