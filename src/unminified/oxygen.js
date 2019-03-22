"use strict";

var storage = {
    "backpack": 1,
    "tank": 1,
    "filters": 8,
    "oxygen": 0.5,
    "units": 0.1,
    "idle": 6/7,
    "sprint": 6/5
};

function truncateValue(val) { // round to 2 decimal digits
    return parseFloat(val).toFixed(2);
}

function parseValue(amps, factor) {
    return Math.ceil(amps/factor);
}

function parseValueTruncate(amps, factor) {
    return truncateValue(amps/factor);
}

function parseValueSeconds(amps, factor) {
    var time = amps/factor;
    var mins = Math.floor(time%60);
    var secs = Math.floor((time*60)%60);
    var hours = Math.floor((time/60)%24);
    var days = Math.floor(time/1440);

    var str = "";
    if (time === 0) return "0 seconds";
    if (days > 0) str += days + " days ";
    if (hours > 0) str += hours + " hours ";
    if (mins > 0) str += mins + " minutes ";
    if (secs > 0) str += secs + " seconds ";
    return str.slice(0, -1);
}

function updateFields(total) {
    var elems = document.getElementsByClassName("output");
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (elem.id === "total") {
            elem.innerHTML = truncateValue(total);
        } else if (elem.className.indexOf("time") > -1) {
            elem.innerHTML = parseValueSeconds(total, storage[elem.id]);
        } else if (elem.className.indexOf("truncate") > -1) {
            elem.innerHTML = parseValueTruncate(total, storage[elem.id]);
        } else {
            elem.innerHTML = parseValue(total, storage[elem.id]);
        }
    }
}

function calc() {
    var total = 0;
    for (var i in storage) {
        if (storage.hasOwnProperty(i)) {
            var elem = document.getElementById(i);
            if (elem.step === "any") {
                total += storage[i]*(parseFloat(elem.value) || 0);
            } else {
                total += storage[i]*(parseInt(elem.value) || 0);
            }
        }
    }

    updateFields(total);
}