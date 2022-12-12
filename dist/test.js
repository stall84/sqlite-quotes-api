"use strict";
var sqlite3 = require('sqlite3');
var fs = require('fs');
fs.readdir('./', function (err, files) {
    if (err)
        throw err;
    console.log("\n Current Directory Contents: ");
    files.forEach(function (file) { return console.log(file); });
});
