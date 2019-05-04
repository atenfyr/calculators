const fs = require("fs");
const uglify = require("uglify-js");
const CleanCSS = require('clean-css');

fs.readdir("../unminified", (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        fs.readFile("../unminified/" + file, "utf8", function(err, data) {
            if (err) throw err;
            var newData = uglify.minify(data);
            if (newData.error) throw newData.error;
            fs.writeFile("../" + file.replace(".js", ".min.js"), newData.code, function(err) {
                if (err) throw err;
                console.log("[JS] Minified " + file);
            }); 
        });
    });
});

cleaner = new CleanCSS();
fs.readdir("../../css/unminified", (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        fs.readFile("../../css/unminified/" + file, "utf8", function(err, data) {
            if (err) throw err;
            output = cleaner.minify(data, function(err, output) {
                if (err) throw err;
                fs.writeFile("../../css/" + file.replace(".css", ".min.css"), output.styles, function(err) {
                    if (err) throw err;
                    console.log("[CSS] Minified " + file);
                }); 
            });
        });
    });
});