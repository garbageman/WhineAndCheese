let InfoService = {
    validateSearch: function (type, name) {
        /* Create a credentials json for validation */
        let searchParams = new Object();
        
        if (type === "wine") {
            searchParams.wine = name;
        } else {
            searchParams.cheese = name;
        }
        /* Create a promise that resolves when the ajax query for validation works */
        return new Promise((resolve, reject) => {
            $.ajax({
                url: CONFIG.baseTestURL + "InfoService.php",
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