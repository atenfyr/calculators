"use strict";

function updateFields(total, explosions) {
    var elems = document.getElementsByClassName("output");
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (elem.id === "total") {
            elem.innerHTML = truncateValue(total);
        } else if (elem.className.indexOf("truncate") > -1) {
            elem.innerHTML = parseValueTruncate(total, entryIndex[elem.id]);
        } else {
            elem.innerHTML = parseValue(total, entryIndex[elem.id]);
        }
    }
    document.getElementById("explosions").innerHTML = explosions;
}

function calc() {
    var total = 0;
    var explosions = 0;
    for (var i in entryIndex) {
        if (entryIndex.hasOwnProperty(i)) {
            var elem = document.getElementById(i);
            if (isElemInvisible(elem)) {
                total += 0;
            } else if (elem.step === "any") {
                total += entryIndex[i]*(parseFloat(elem.value) || 0);
            } else {
                var num = parseInt(elem.value) || 0;
                if (entryIndex[i] === 0) explosions += num;
                total += entryIndex[i]*num;
            }
        }
    }

    for (var i in resourceIndex) {
        if (resourceIndex.hasOwnProperty(i)) {
            var elem = document.getElementById(i);
            var num = parseFloat(elem.value) || 0;
            if (isElemInvisible(elem)) num = 0;
            if (i === "explosivePowder") explosions += num;
            total += resourceIndex[i]*num;
        }
    }

    updateFields(total, explosions);
}