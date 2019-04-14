"use strict";

var res = {
    "aluminum": 1,
    "aluminumAlloy": 1.5, // estimate
    "ammonium": 0.5,
    "carbon": 0.5, // estimate
    "ceramic": 0.5,
    "clay": 0.25,
    "compound": 0.25,
    "copper": 1,
    "diamond": 2,
    "explosivePowder": 0,
    "glass": 0.5,
    "graphene": 1.5, // estimate
    "graphite": 0.25,
    "hematite": 0.75,
    "iron": 1.5,
    "laterite": 0.5,
    "lithium": 2,
    "malachite": 0.5,
    "nanocarbonAlloy": 2,
    "organic": 0.25, // estimate
    "plastic": 1, // estimate
    "quartz": 0.25,
    "resin": 0.25,
    "rubber": 1,
    "silicone": 1.5, // estimate
    "sphalerite": 0.25,
    "steel": 2, // estimate
    "titanite": 0.5, // estimate
    "titanium": 1, // estimate
    "titaniumAlloy": 1.5,
    "tungsten": 1.5,
    "tungstenCarbide": 1.5,
    "wolframite": 0.75,
    "zinc": 0.5,
};

var storage = {
    "beacon": res.quartz,
    "canister": res.resin,
    "dynamite": res.explosivePowder,
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

    "cones": 0.02,
};

function updateFields(total, explosions) {
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
    document.getElementById("explosions").innerHTML = explosions;
}

function calc() {
    var total = 0;
    var explosions = 0;
    for (var i in storage) {
        if (storage.hasOwnProperty(i)) {
            var elem = document.getElementById(i);
            if (elem.step === "any") {
                total += storage[i]*(parseFloat(elem.value) || 0);
            } else {
                var num = parseInt(elem.value) || 0;
                if (i === "dynamite") explosions += num;
                total += storage[i]*num;
            }
        }
    }
    for (var i in res) {
        if (res.hasOwnProperty(i)) {
            var num = parseFloat(document.getElementById(i).value) || 0;
            if (i === "explosivePowder") explosions += num;
            total += res[i]*num;
        }
    }

    updateFields(total, explosions);
}