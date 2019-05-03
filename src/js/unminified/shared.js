"use strict";

var exponentialRegex = /([.\d]+)e\+(\d+)/;
function overflowCheck(val, forceReturnVal) {
    if (val >= 1e100) return "∞";
    if (val > 1e18) return val.toExponential().replace(exponentialRegex, function(match, p1, p2) {
        return parseFloat(p1).toFixed(2) + " × 10<sup>" + p2 + "</sup>";
    });
    if (forceReturnVal) return val;
    return null;
}

var truncateRegex = /^[^.]+\.?\d{0,2}/;
function truncateValue(val) { // round to 2 decimal digits
    var parsedVal = parseFloat(val);
    var checked = overflowCheck(parsedVal);
    if (checked) return checked;

    var str = parsedVal.toLocaleString();
    if (str.indexOf(".") > -1) str += "00";
    else str += ".00";
    return str.match(truncateRegex)[0];
}

function parseValue(num, factor) {
    var parsedVal = Math.ceil(num/factor);
    var checked = overflowCheck(parsedVal);
    if (checked) return checked;
    return parsedVal.toLocaleString();
}

function parseValueTruncate(num, factor) {
    return truncateValue(num/factor);
}

function parseValueSeconds(num, factor) {
    var time = num/factor;
    var secs = Math.floor((time*60)%60);
    var mins = Math.floor(time%60);
    var hours = Math.floor((time/60)%24);
    var days = Math.floor((time/1440)%30);
    var months = Math.floor((time/43200)%12);
    var years = Math.floor(time/518400);

    if (years >= 1e100) return "∞ years";
    
    var str = "";
    if (years > 0) str += overflowCheck(years, true) + " years ";
    if (months > 0) str += months + " months ";
    if (days > 0) str += days + " days ";
    if (hours > 0) str += hours + " hours ";
    if (mins > 0) str += mins + " minutes ";
    if (secs > 0) str += secs + " seconds ";
    if (str === "") return "0 seconds";
    return str.slice(0, -1);
}