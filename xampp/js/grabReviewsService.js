let grabReviewsService = {
    validateSearch: function (wine, cheese) {
        /* Create a credentials json for validation */
        let searchParams = {
            "wine": wine,
            "cheese": cheese
        };
        /* Create a promise that resolves when the ajax query for validation works */
        return new Promise((resolve, reject) => {
            $.ajax({
                url: CONFIG.baseTestURL + "GrabReviewsService.php",
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
};