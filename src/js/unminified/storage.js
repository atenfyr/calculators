"use strict";

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
    "snail": 2048
};

var spaceSnailShown = false;

function unhideSnail() {
    if (document.getElementById("total").innerHTML === "13.37" && !spaceSnailShown) {
        document.getElementById("snail_wrapper").removeAttribute("style");
        spaceSnailShown = true;
    }
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
            var elem = document.getElementById(i);
            if (i === "snail" && !spaceSnailShown) continue;
            if (elem.step === "any") {
                total += storage[i]*(parseFloat(elem.value) || 0);
            } else {
                total += storage[i]*(parseInt(elem.value) || 0);
            }
        }
    }

    updateFields(total);
}