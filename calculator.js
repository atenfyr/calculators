"use strict";

var amperage = {
    "furnace": 3,
    "centri": 4,
    "lab": 3,
    "condense": 6,
    "research": 2,
    "medshred": 1.5,
    "largeshred": 3,
    "smallprint": 1,
    "medprint": 2,
    "largeprint": 3
}

function truncateValue(val) { // round to 2 decimal digits
    return parseFloat(val).toFixed(2);
}

function parseValue(amps, factor) {
    return Math.ceil(amps/factor);
}

function calc() {
    var total = 0;
    var speed = parseInt(document.getElementById("speed").value);
    if (isNaN(speed)) speed = 100;
    speed = Math.ceil(speed) / 100;

    for (var i in amperage) {
        if (amperage.hasOwnProperty(i)) {
            total += (amperage[i]*speed)*(parseInt(document.getElementById(i).value) || 0);
        }
    }

    document.getElementById("total").innerHTML = truncateValue(total);
    document.getElementById("rtgs").innerHTML = parseValue(total, 4);
    document.getElementById("smallgen").innerHTML = parseValue(total, 1);
    document.getElementById("medgen").innerHTML = parseValue(total, 3);
    document.getElementById("smallsolar").innerHTML = parseValue(total, 0.5);
    document.getElementById("medsolar").innerHTML = parseValue(total, 2);
    document.getElementById("array").innerHTML = parseValue(total, 8);
    document.getElementById("smallwind").innerHTML = parseValue(total, 0.5);
    document.getElementById("medwind").innerHTML = parseValue(total, 1);
    return total;
}