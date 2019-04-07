"use strict";

var storage = {
    "beacon": 0.25,
    "canister": 0.25,
    "extenders": 0.2,
    "filters": 0.25,
    "packager": 0.25,
    "po2": 2,
    "cells": 0.5,
    "smallbattery": 2,
    "smallgenerator": 0.25,
    "smalltank": 0.5,
    "smallprinter": 0.25,
    "smallsolar": 1,
    "smallwind": 0.5,
    "tethers": 1/44,
    "alignmentmod": 0.5,
    "boostmod": 0.5,
    "mod1": 0.5,
    "mod2": 1.5,
    "mod3": 2,
    "inhibitormod": 0.5,
    "narrowmod": 0.5,
    "terrainanalyzer": 0.5,
    "widemod": 0.5,
    "worklight": 1,

    "drill1": 2,
    "drill2": 3,
    "drill3": 3.5,
    "hydrazinethruster": 3,
    "mediumbattery": 2.5,
    "mediumgenerator": 2.5,
    "mediumprinter": 0.5,
    "mediumshredder": 3,
    "mediumsolar": 1.5,
    "mediumstorage": 0.5,
    "mediumwind": 1,
    "oxygenator": 1.5,
    "roverseat": 0.5,
    "rtg": 4,
    "solidfuelthruster": 1.5,
    "splitter": 1.75,
    "winch": 2.5,

    "ddropship": 0.75,
    "ddropshipdome": 0.3,
    "ddropshipdoor": 0.3,
    "ddropshipwhite": 0.24,
    "ddropshipblue": 0.14,
    "dextender": 0.2,
    "dsolarpanel": 1.12,
    "dsolarcell": 0.375,
    "dwindturbine": 0.75,
    "dwindturbineblade": 0.25,
    "dmediumgenerator": 2.5,
    "droverseat": 0.5,
    "droverwheel": 0.25,
    "dtether": 0.025,
    "dcatalog": 1.5,
    "darraysupport": 1.5,
    "darraypanel": 0.5,
    "darraystrut": 0.5,
    "darraycell": 1.5,
    "darrayframe": 0.75,
    "darraylarge": 1.5,
    "darraysmall": 0.25,

    "cones": 0.02,
};

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
            if (elem.step === "any") {
                total += storage[i]*(parseFloat(elem.value) || 0);
            } else {
                total += storage[i]*(parseInt(elem.value) || 0);
            }
        }
    }

    updateFields(total);
}