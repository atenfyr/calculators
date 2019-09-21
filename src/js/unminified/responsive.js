"use strict";

/* EFT */
// <img class="flight-icon" src="assets/flight.png" onclick="eft()">
var isEFT = false;
var HEADER_DATA = " (<abbr title=\"EFT, or &quot;EXO Flight Test,&quot; is Astroneer's system for opt-in open betas for the next content update. With this option enabled, this calculator will show content exclusive to the EXO Flight Test and not present in the latest stable release. All EFT-exclusive entries are marked by a red icon.\">EFT</abbr>)";

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
    calc();
}

/* Go to Top */

function headToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

window.addEventListener("load", function(){
    var headToTopButton = document.getElementById("headToTop");

    function updateTopButton() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) headToTopButton.style.display = "block";
        else headToTopButton.style.display = "none";
    }

    if (headToTopButton)
    {
        window.onscroll = updateTopButton;
        updateTopButton();
    }
});