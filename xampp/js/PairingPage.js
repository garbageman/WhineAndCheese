
main();

function main () {
    let wineName = "Merlot";
    let cheeseName = "Gouda";
    let title = `${wineName} &amp; ${cheeseName}`;
    document.getElementById("pairing-title").innerHTML = title;
    document.getElementById("wine-title").innerHTML = wineName;
    document.getElementById("cheese-title").innerHTML = cheeseName;
    
    wineInfoService.validateSearch(CONFIG.QueryString()["wine"]).then(function (result) {

        //let parsed = JSON.parse(result);
        //console.log(parsed);
        //let pairings = buildPairings(result);
        //displayResults(pairings);
        console.log(result);
    });
    
}




