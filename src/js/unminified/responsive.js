var isEFT = false;

function expand() {
    var navBar = document.getElementById("navbar");
    if (navBar.className === "closed") {
        navBar.className = "open";
    } else {
        navBar.className = "closed";
    }
}

function eft() {
    isEFT = !isEFT;
    var newDisplayEFT = "none";
    var newDisplayNOT = "inline-block";
    if (isEFT) {
        document.getElementById("header_text").innerHTML += " (EFT)";
        newDisplayEFT = "inline-block";
        newDisplayNOT = "none";
    } else {
        document.getElementById("header_text").innerHTML = document.getElementById("header_text").innerHTML.replace(" (EFT)", "");
    }
    var elems = document.getElementsByClassName("eft");
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = newDisplayEFT;
    }
    elems = document.getElementsByClassName("not_eft");
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = newDisplayNOT;
    }
}