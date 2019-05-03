const fs = require("fs");

/// Scrap data ///
var resourceIndex = {
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
    "plastic": 0.5,
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

/*
    The goal of this program is to simplify the values in the data table given below into numbers that are given to the client.
    --Entry Syntax Guide--
        If an entry is a number, it is already simplified and does not need to be processed further.
        If an entry is a string, the value of the entry is the value of the resource designated by the string.
        If an entry is an array with the first element being a string and the second element being a number, the value of the entry is the value of the resource designated by the string times the number.
        If an entry is an array that does not meet any other criteria, all of the array's elements go through the same process as a regular entry, with the value of the entry being equal to the sum of all its elements.
        If an entry does not meet any of the above criteria, the entry is invalid.
*/

var entryIndex = {
    "beacon": "quartz",
    "canister": "resin",
    "dynamite": "explosivePowder",
    "extenders": ["copper", 0.2],
    "filters": "resin",
    "packager": "graphite",
    "po2": "nanocarbonAlloy",
    "cells": "zinc",
    "smallbattery": "lithium",
    "smallgenerator": "compound",
    "smalltank": "glass",
    "smallprinter": "compound",
    "smallsolar": "copper",
    "smallwind": "glass",
    "tethers": ["compound", 11],
    "alignmentmod": "zinc",
    "boostmod": "zinc",
    "mod1": "ceramic",
    "mod2": "tungstenCarbide",
    "mod3": "diamond",
    "inhibitormod": "zinc",
    "narrowmod": "zinc",
    "terrainanalyzer": "zinc",
    "widemod": "zinc",
    "worklight": "copper",

    "drill1": ["ceramic", "tungstenCarbide"],
    "drill2": ["titaniumAlloy", "tungstenCarbide"],
    "drill3": ["titaniumAlloy", "diamond"],
    "hydrazinethruster": ["titaniumAlloy", "tungsten"],
    "mediumbattery": ["lithium", "zinc"],
    "mediumgenerator": ["aluminum", "tungsten"],
    "mediumprinter": ["compound", 2],
    "mediumshredder": ["iron", 2],
    "mediumsolar": ["copper","glass"],
    "mediumstorage": ["resin", 2],
    "mediumwind": ["ceramic", "glass"],
    "oxygenator": ["ceramic", "aluminum"],
    "roverseat": ["compound", 2],
    "rtg": ["nanocarbonAlloy", "lithium"],
    "solidfuelthruster": ["ammonium", "aluminum"],
    "splitter": ["copper", "graphite"],
    "winch": ["tungsten", "rubber"],

    "condense": ["plastic", "glass", "iron"],
    "crane": ["steel", "silicone", "titanium"],
    "lab": ["tungsten", "glass", "ceramic"],
    "largeprint": ["compound", 3],
    "largeseat": ["compound", ["plastic", 2]],
    "largeshred": ["tungstenCarbide", ["iron", 2]],
    "largestorage": ["ceramic", 3],
    "research": ["resin", ["compound", 2]],
    "furnace": [["resin", 2], "compound"],
    "centri": ["aluminum", ["compound", 2]],
    "tradeplatform": ["iron", "tungsten", "compound"],

    "cones": 0.02
};

function parseData(key) {
    var data = entryIndex[key] || key;
    if (typeof data === "number") return data;
    if (typeof data === "string") return resourceIndex[data];
    if (typeof data === "object") {
        if (data.length === 2 && typeof data[0] === "string" && typeof data[1] === "number") return resourceIndex[data[0]]*data[1];
        var total = 0;
        for (var i in data) {
            if (data.hasOwnProperty(i)) total += parseData(data[i]);
        }
        return total;
    }
    throw new Error("Could not parse data for key " + key + ". Object type is " + (typeof data) + ".");
}

var result = `var entryIndex={`;
for (var i in entryIndex) {
    if (entryIndex.hasOwnProperty(i)) {
        result += '"' + i + '":' + parseData(i) + ",";
    }
}
result = result.slice(0, -1);
result += "};var resourceIndex={";
for (var i in resourceIndex) {
    if (resourceIndex.hasOwnProperty(i)) {
        result += '"' + i + '":' + parseData(i) + ",";
    }
}
result = result.slice(0, -1);
result += "}";
fs.writeFile("../scrap.data.js", result, function(err) {
    if (err) return console.error(err);
});
console.log("Exported scrap.data.js");