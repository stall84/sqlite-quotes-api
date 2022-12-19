import serverless from 'serverless-http';
import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const dbPath = __dirname + '/db/quotes.db';

sqlite3.verbose();
const app = express();

app.use(cors());

app.get('/tags', function (req, res) {
    const db = new sqlite3.Database(dbPath);

    db.all("SELECT DISTINCT tag FROM quotes", (err: any, rows) => {
        if (err) {
            throw new Error(err);
        }
        const tags = rows.map(row => row.tag);
        res.json(tags);
    })
})

if (process.argv[2] == 'localTesting') {
    app.listen(3000, () => {
        console.log("Local-Listening at http://localhost:3000");
    });
} else {
    module.exports.handler = serverless(app);
}