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
    "largeprint": 3,
    "sylva": 5,
    "desolo": 8,
    "calidor": 12,
    "vesania": 16,
    "novus": 21,
    "glacio": 26,
    "atrox": 30,
    "medrover": 0.5,
    "largerover": 1,
    "tractor": 0.075,
    "buggy": 0.019
}

var can_be_slowed_down = [
    "furnace",
    "centri",
    "lab",
    "condense",
    "research",
    "medshred",
    "largeshred",
    "smallprint",
    "medprint",
    "largeprint"
]

var power = {
    "rtgs": 4,
    "smallgen": 1,
    "medgen": 3,
    "smallsolar": 0.5,
    "medsolar": 2,
    "array": 8,
    "smallwind": 0.5,
    "medwind": 1,
    "shelter": 1,
    "smallbatt": 1,
    "medbatt": 3
}

function truncateValue(val) { // round to 2 decimal digits
    return parseFloat(val).toFixed(2);
}

function parseValue(amps, factor) {
    return Math.ceil(amps/factor);
}

function updateFields(total) {
    var elems = document.getElementsByClassName("output");
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (elem.id === "total") {
            elem.innerHTML = truncateValue(total);
        } else {
            elem.innerHTML = parseValue(total, power[elem.id])
        }
    }
}

function calc() {
    var total = 0;
    var speed = parseInt(document.getElementById("speed").value);
    if (isNaN(speed) || speed < 0 || speed > 100) speed = 100;
    speed = Math.ceil(speed) / 100;

    for (var i in amperage) {
        if (amperage.hasOwnProperty(i)) {
            var adjusted = amperage[i];
            if (can_be_slowed_down.indexOf(i) !== -1) {
                adjusted *= speed;
            }
            total += adjusted*(parseInt(document.getElementById(i).value) || 0);
        }
    }

    updateFields(total);
}

function calc_amps() {
    var total = 0;
    for (var i in power) {
        if (power.hasOwnProperty(i)) {
            total += power[i]*(parseInt(document.getElementById(i).value) || 0);
        }
    }

    updateFields(total);
}