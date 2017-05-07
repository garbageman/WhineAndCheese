/**
 * Created by Christopher on 5/6/2017.
 */

let searchService = {
    validateSearch: function (item1, item2) {
        /* Create a credentials json for validation */
        let searchParams = {
            "item1": item1,
            "item2": item2
        };

        /* Create a promise that resolves when the ajax query for validation works */
        return new Promise((resolve, reject) => {
            $.ajax({
                url: CONFIG.baseTestURL + "services/ResultService.php",
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
