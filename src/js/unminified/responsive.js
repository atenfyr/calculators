"use strict";

var isEFT = false;
var HEADER_DATA = " (<abbr title=\"EFT, or &quot;Exo Flight Test,&quot; is Astroneer's system for opt-in open betas for the next content update. With this option enabled, this calculator will show content exclusive to the Exo Flight Test and not present in the latest stable release.\">EFT</abbr>)";

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
        document.getElementById("header_text").innerHTML += HEADER_DATA;
        newDisplayEFT = "inline-block";
        newDisplayNOT = "none";
    } else {
        document.getElementById("header_text").innerHTML = document.getElementById("header_text").innerHTML.replace(HEADER_DATA, "");
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