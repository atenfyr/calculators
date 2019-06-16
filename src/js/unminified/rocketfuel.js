"use strict";

var storage = {
    "solidfuel": 4,
    "fullthruster": 24,
    "hydrazine": 8,
    "ammonium": 4,
    "flight": 720/19
};

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
            if (isElemInvisible(elem)) {
                total += 0;
            } else if (elem.step === "any") {
                total += storage[i]*(parseFloat(elem.value) || 0);
            } else {
                total += storage[i]*(parseInt(elem.value) || 0);
            }
        }
    }

    updateFields(total);
}