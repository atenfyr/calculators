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
    document.getElementById("total").innerHTML = total;
    document.getElementById("rtgs").innerHTML = Math.ceil(total/4);
    document.getElementById("smallgen").innerHTML = Math.ceil(total);
    document.getElementById("medgen").innerHTML = Math.ceil(total/3);
    document.getElementById("smallsolar").innerHTML = Math.ceil(total/0.5);
    document.getElementById("medsolar").innerHTML = Math.ceil(total/2);
    document.getElementById("array").innerHTML = Math.ceil(total/8);
    document.getElementById("smallwind").innerHTML = Math.ceil(total/0.5);
    document.getElementById("medwind").innerHTML = Math.ceil(total);
    return total;
}