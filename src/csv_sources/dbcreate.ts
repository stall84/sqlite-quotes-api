import sqlite3 from 'sqlite3';
import express from 'express';
import fs from 'fs';

// Set the logging level to high/verbose
sqlite3.verbose();

// Create the database dynamically on the cwd running in. Go up to the parent dir and create the db in a folder named db (created if not exists)
const db = new sqlite3.Database(__dirname + '/../db/quotes.db');

// Below is an array of regex patterns we'll use to match valid quote 'tuples' on from the source csv files.
const CSV_ATTEMPTS_MATCH = [
    '"([^"]+)", *"([^"]+)".*',
    '"([^"]+)", *([^,]+).*',
    '([^,]+), *([^,]+).*',
    '([^,]+), *"([^"]+)".*',
];
// Below is an array to hold our matched quotes during an insert statement
const ALREADY_ADDED = [];

// serialize() is an sqlite3 control flow method which ensures command-objects are queued and executed sequentially
db.serialize(() => {
    // run(sqlString, [params], [callback]) runs the query with (optional) parameters and (optional) callback.  
    db.run("DROP TABLE IF EXISTS quotes");
    db.run("CREATE TABLE quotes (quote TEXT, author TEXT, tag TEXT)");

    // readdirSync will return a string array of the csv-file-names in current folder, which we then map over to extract the quotes
    fs.readdirSync(__dirname + "/csv").map((csvFile: any) => {
        db.run("BEGIN TRANSACTION");
        // Prepares the SQL statement and optionally binds the specified parameters (?) and calls the callback when done. The function returns a Statement object.
        const insertStatement = db.prepare("INSERT INTO quotes (quote, author, tag) VALUES (?, ?, ?)");
        // Now inside the list of csv files, we will enter into each file individually and read them with utf8 formatting, and for each line check for matches with our regex
        fs.readFileSync(`${__dirname}/csv/${csvFile}`, 'utf8')
            // readFileSync returns a string of the file's contents (in this case). Let's split this expected csv format (with newLines separating elements) on linebreaks
            .split("\n")
            .forEach((csvLine: string) => {
                for (let regexIndex in CSV_ATTEMPTS_MATCH) {
                    let match = csvLine.match(CSV_ATTEMPTS_MATCH[regexIndex]);
                    // if (match && !ALREADY_ADDED.includes())
                }
            })
    })
})