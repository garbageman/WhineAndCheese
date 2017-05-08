
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
    reviews.reverse();
    return reviews;
}

function generatePairingInformationSection (sectionId, content) {
    document.getElementById(sectionId).innerHTML = content;
}


function generateReviewsSection (reviews) {
    let reviewSection = document.getElementById("all-reviews");
    let id = 0;
    
    for (let review of reviews) {
        let userProfileUrl = relocateUserProfile(review.userName);
        let starRating = generateStarRating(review.rating);
        
        reviewSection.innerHTML += "<div class='thumbnail   thumbnail-col' id='review" + id + "'>";

        let row = document.getElementById("review" + id);
        row.innerHTML = `<span class='  thumbnail-header '><a href='${userProfileUrl}'> ${review.userName} </a></span>`;
        row.innerHTML += `<span class='   rating'>${starRating}</span><br>`;
        row.innerHTML += `<span class=' '>${review.review}</span>`;

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
    let num = 5;
    for (let i = 0; i < rating; i++) {
        result += "<span class='star'>&#9733;</span>";
        num--;
    }
    for (let i = 0; i < num; i++) {
        result += "<span class='star border'>&#9733;</span>";
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

    UserManager.setUserLink();

    $("#logoutLink").click(function() {
      UserManager.logout();
      UserManager.setUserLink();
      $("#logoutLink").css("display","none");
    });

}
