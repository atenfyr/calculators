"use strict";

var storage = {
    "backpack": 1,
    "tank": 1,
    "filters": 8,
    "oxygen": 0.5,
    "units": 0.1,
    "idle": 6/7,
    "sprint": 6/5
}

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
    var mins = Math.floor(time);
    var secs = Math.floor((time-mins)*60);

    if (mins > 0 && secs !== 0) {
        return mins.toString() + " minutes " + secs.toString() + " seconds";
    } else if (mins === 0) {
        return secs.toString() + " seconds";
    } else {
        return mins.toString() + " minutes";
    }
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