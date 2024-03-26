import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3');

let db;

export function init() {
    db = new sqlite3.Database('./db/timerly.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Connected to database.');
        }
    });
    
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS
                Score (
                    username varchar(50) PRIMARY KEY,
                    score INTEGER,
                    lastUpdatedDateTimeUTC TEXT)`,
                    (err) => {
                        if (err) {
                            console.error(err.message);
                        }
                    });
        db.run(`CREATE TABLE IF NOT EXISTS
                TakenTime (time varchar(20) UNIQUE)`,
                (err) => {
                    if (err) {
                        console.error(err.message);
                    }
                });
    });
}

export function getScoreByUsername(username) {
    return new Promise((resolve) => {
        db.get(`SELECT score
                FROM Score
                WHERE username = '${username}'`,
                (err, row) => {
                    if (err) {
                        resolve(-1);
                    } else {
                        resolve(row.score);
                    }
                });
    });
}

export function upsertUserScore(username, score) {
    return new Promise((resolve) => {
        db.get(`SELECT username, score FROM Score WHERE username = '${username}'`, (err, row) => {
            if (row) {
                db.run(`UPDATE SCORE SET score = score + ${score}, lastUpdatedDateTimeUTC = '${new Date().toISOString()}' WHERE username = '${username}'`);
            } else {
                db.run(`INSERT INTO Score (username, score, lastUpdatedDateTimeUTC) VALUES ('${username}', 1, '${new Date().toISOString()}')`);
            }
            resolve();
        });
    });
}

export function markTimeAsTaken(time) {
    return new Promise((resolve) => {
        db.run(`INSERT INTO TakenTime (time) VALUES ('${time}')`, resolve);
    });
}

export function isTimeTaken(time) {
    return new Promise((resolve) => {
        db.get(`SELECT time FROM TakenTime WHERE time = '${time}'`, (err, row) => {
            if (row !== undefined) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

export function getAllScores() {
    return new Promise((resolve) => {
        db.all(`SELECT username, score, lastUpdatedDateTimeUTC FROM Score`, (err, rows) => {
            resolve(rows);
        })
    });
}
