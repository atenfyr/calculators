"use strict";

var resources = {
    "compound": 0.25,
    "resin": 0.25,
    "graphite": 0.25,
    "quartz": 0.25,
    "ammonium": 0.5,
    "glass": 0.5,
    "ceramic": 0.5,
    "aluminum": 1,
    "copper": 1,
    "zinc": 0.5,
    "tungsten": 1.5,
    "iron": 1.5,
    "lithium": 2,
    "rubber": 1,
    "tungstenCarbide": 1.5,
    "titaniumAlloy": 1.5,
    "diamond": 2,
    "nanocarbonAlloy": 2,
};

var storage = {
    "beacon": resources["quartz"],
    "canister": resources["resin"],
    "extenders": resources["copper"]/5,
    "filters": resources["resin"],
    "packager": resources["graphite"],
    "po2": resources["nanocarbonAlloy"],
    "cells": resources["zinc"],
    "smallbattery": resources["lithium"],
    "smallgenerator": resources["compound"],
    "smalltank": resources["glass"],
    "smallprinter": resources["compound"],
    "smallsolar": resources["copper"],
    "smallwind": resources["glass"],
    "tethers": resources["compound"]/11,
    "alignmentmod": resources["zinc"],
    "boostmod": resources["zinc"],
    "mod1": resources["ceramic"],
    "mod2": resources["tungstenCarbide"],
    "mod3": resources["diamond"],
    "inhibitormod": resources["zinc"],
    "narrowmod": resources["zinc"],
    "terrainanalyzer": resources["zinc"],
    "widemod": resources["zinc"],
    "worklight": resources["copper"],

    "drill1": resources["ceramic"]+resources["tungstenCarbide"],
    "drill2": resources["titaniumAlloy"]+resources["tungstenCarbide"],
    "drill3": resources["titaniumAlloy"]+resources["diamond"],
    "hydrazinethruster": resources["titaniumAlloy"]+resources["tungsten"],
    "mediumbattery": resources["lithium"]+resources["zinc"],
    "mediumgenerator": resources["aluminum"]+resources["tungsten"],
    "mediumprinter": resources["compound"]*2,
    "mediumshredder": resources["iron"]*2,
    "mediumsolar": resources["copper"]+resources["glass"],
    "mediumstorage": resources["resin"]*2,
    "mediumwind": resources["ceramic"]+resources["glass"],
    "oxygenator": resources["ceramic"]+resources["aluminum"],
    "roverseat": resources["compound"]*2,
    "rtg": resources["nanocarbonAlloy"]+resources["lithium"],
    "solidfuelthruster": resources["ammonium"]+resources["aluminum"],
    "splitter": resources["copper"]+resources["graphite"],
    "winch": resources["tungsten"]+resources["rubber"],

    "ddropship": 0.75,
    "ddropshipdome": 0.3,
    "ddropshipdoor": 0.3,
    "ddropshipwhite": 0.24,
    "ddropshipblue": 0.14,
    "dextender": resources["copper"]/5,
    "dsolarpanel": 1.12,
    "dsolarcell": 0.375,
    "dwindturbine": 0.75,
    "dwindturbineblade": 0.25,
    "dmediumgenerator": resources["aluminum"]+resources["tungsten"],
    "droverseat": 0.5,
    "droverwheel": 0.25,
    "dtether": resources["compound"]/11,
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