"use strict";

var res = {
    "aluminum": 1,
    "aluminumAlloy": 1.5,
    "ammonium": 0.5,
    "carbon": 0.5,
    "ceramic": 0.5,
    "clay": 0.25,
    "compound": 0.25,
    "copper": 1,
    "diamond": 2,
    "glass": 0.5,
    "graphene": 1.5,
    "graphite": 0.25,
    "hematite": 0.75,
    "iron": 1.5,
    "laterite": 0.5,
    "lithium": 2,
    "malachite": 0.5,
    "nanocarbonAlloy": 2,
    "organic": 0.25,
    "plastic": 1,
    "quartz": 0.25,
    "resin": 0.25,
    "rubber": 1,
    "silicone": 1.5,
    "sphalerite": 0.25,
    "steel": 2,
    "titanite": 0.5,
    "titanium": 1,
    "titaniumAlloy": 1.5,
    "tungsten": 1.5,
    "tungstenCarbide": 1.5,
    "wolframite": 0.75,
    "zinc": 0.5,
};

var storage = {
    "beacon": res.quartz,
    "canister": res.resin,
    "extenders": res.copper/5,
    "filters": res.resin,
    "packager": res.graphite,
    "po2": res.nanocarbonAlloy,
    "cells": res.zinc,
    "smallbattery": res.lithium,
    "smallgenerator": res.compound,
    "smalltank": res.glass,
    "smallprinter": res.compound,
    "smallsolar": res.copper,
    "smallwind": res.glass,
    "tethers": res.compound/11,
    "alignmentmod": res.zinc,
    "boostmod": res.zinc,
    "mod1": res.ceramic,
    "mod2": res.tungstenCarbide,
    "mod3": res.diamond,
    "inhibitormod": res.zinc,
    "narrowmod": res.zinc,
    "terrainanalyzer": res.zinc,
    "widemod": res.zinc,
    "worklight": res.copper,

    "drill1": res.ceramic+res.tungstenCarbide,
    "drill2": res.titaniumAlloy+res.tungstenCarbide,
    "drill3": res.titaniumAlloy+res.diamond,
    "hydrazinethruster": res.titaniumAlloy+res.tungsten,
    "mediumbattery": res.lithium+res.zinc,
    "mediumgenerator": res.aluminum+res.tungsten,
    "mediumprinter": res.compound*2,
    "mediumshredder": res.iron*2,
    "mediumsolar": res.copper+res.glass,
    "mediumstorage": res.resin*2,
    "mediumwind": res.ceramic+res.glass,
    "oxygenator": res.ceramic+res.aluminum,
    "roverseat": res.compound*2,
    "rtg": res.nanocarbonAlloy+res.lithium,
    "solidfuelthruster": res.ammonium+res.aluminum,
    "splitter": res.copper+res.graphite,
    "winch": res.tungsten+res.rubber,

    "ddropship": (res.silicone/2)+(res.plastic/2),
    "ddropshipdoor": (res.silicone/5)+(res.plastic/5),
    "ddropshiplid": (res.silicone/5)+(res.plastic/5),
    "dextender": res.copper/5,
    "dsolarpanel": (res.copper*0.75)+(res.glass*0.75),
    "dsolarcell": (res.copper/4)+(res.glass/4),
    "dwindturbine": (res.ceramic*0.75)+(res.glass*0.75),
    "dwindturbineblade": (res.ceramic/4)+(res.glass/4),
    "dmediumgenerator": res.aluminum+res.tungsten,
    "droverseat": res.compound*2,
    "droverwheel": res.rubber/4,
    "dtether": res.compound/11,
    "dcatalog": res.iron,
    "darraysupport": 1.5,
    "darraypanel": 0.5,
    "darraystrut": 0.5,
    "darraycell": 1.5,
    "darrayframe": 0.75,
    "darraylarge": 1.5,
    "darraysmall": res.copper/4,

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