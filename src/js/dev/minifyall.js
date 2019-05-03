const fs = require("fs");
const uglify = require("uglify-js");

fs.readdir("../unminified", (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        fs.readFile("../unminified/" + file, "utf8", function(err, data) {
            if (err) throw err;
            var newData = uglify.minify(data);
            if (newData.error) throw newData.error;
            fs.writeFile("../" + file.replace(".js", ".min.js"), newData.code, function(err) {
                if (err) throw err;
                console.log("Minified " + file);
            }); 
        });
    });
});