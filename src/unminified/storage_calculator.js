var storage = {
    "smallbatt": 32,
    "medbatt": 256,
    "cells": 48,
    "medrover": 8,
    "largerover": 16,
    "tractor": 4,
    "buggy": 4,
    "backpack": 10,
    "power": 32,
    "organic": 100,
    "carbon": 300,
}

function truncateValue(val) { // round to 2 decimal digits
    return parseFloat(val).toFixed(2);
}

function parseValue(amps, factor) {
    return Math.ceil(amps/factor)
}

function parseValueTruncate(amps, factor) {
    return truncateValue(amps/factor);
}

function updateFields(total) {
    var elems = document.getElementsByClassName("output");
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (elem.id === "total") {
            elem.innerHTML = truncateValue(total);
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
            total += storage[i]*(parseInt(document.getElementById(i).value) || 0);
        }
    }

    updateFields(total);
}