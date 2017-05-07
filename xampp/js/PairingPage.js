
main();

function main () {
    let wineName = "Merlot";
    let cheeseName = "Gouda";
    let title = `${wineName} &amp; ${cheeseName}`;
    document.getElementById("pairing-title").innerHTML = title;
    document.getElementById("wine-title").innerHTML = wineName;
    document.getElementById("cheese-title").innerHTML = cheeseName;
}




