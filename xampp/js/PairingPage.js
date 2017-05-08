
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
        let userProfileUrl = relocateUserProfile(review.userName);
        let starRating = generateStarRating(review.rating);
        
        reviewSection.innerHTML += "<div class='row searchrow hover' id='result" + id + "'>";
        
        let row = document.getElementById("result" + id);
        row.innerHTML = `<span class='col-lg-8 pairing'><a href='${userProfileUrl}'> ${review.userName} </a></span>`;
        row.innerHTML += `${starRating}<br>`;
        row.innerHTML += `<span class='col-lg-2 rating'>Review: ${review.review} </span>`;
        //row.innerHTML += `<span class='col-lg-2 numReviews'>Rating: ${review.rating} </span>`;

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

function relocateWriteReview(wine, cheese) {
    let url = "createReview.html";
    let params = ("?wine=" + wine + "&" + "cheese=" + cheese).replace(" ", "+");
    window.location.href = url + params;
}

function relocateUserProfile(user) {
    let url = "userProfile.html?user=" + user;
    return url;
}

function generateStarRating(rating) {
    let result = "";//"<div class='star'>";
    for (let i = 0; i < rating; i++) {
        result += "<span class='star'>&#9733;</span>";
    }
    //result += "</div>";
    return result;
}

main();

function main () {
    let wineName = (CONFIG.QueryString()["wine"]).replace("+", " ");
    let cheeseName = (CONFIG.QueryString()["cheese"]).replace("+", " ");
    let title = `${wineName} &amp; ${cheeseName}`;
    let wineUrl = CONFIG.wineURL + "?wine=" + wineName;
    let cheeseUrl = CONFIG.cheeseURL + "?cheese=" + cheeseName;
    console.log(wineUrl);
    console.log(cheeseUrl);
    
    document.getElementById("wine-img").src = wineUrl;
    document.getElementById("cheese-img").src = cheeseUrl;
    
    //$("#image1").attr("src", wineConcat);
    //$("#image3").attr("src", cheeseConcat);
    
    document.getElementById("pairing-title").innerHTML = title;
    document.getElementById("wine-title").innerHTML = wineName;
    document.getElementById("cheese-title").innerHTML = cheeseName;
    document.getElementById("toReviewButton").onclick = function () { relocateWriteReview(wineName, cheeseName); };
    
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
        let reviews = buildReviews(result);
        for (let review of reviews) {
            console.log(review.toString());
        }
        generateReviewsSection(reviews);
    });
    
}




