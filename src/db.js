import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sql = require('mssql');

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_ADDRESS,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
}

let db;

export async function init() {
    try {
        await sql.connect(sqlConfig);
        console.log(`Connected to database ${sqlConfig.database} with user ${sqlConfig.user}.`);
    } catch (error) {
        console.error(error);
    }
    
    sql.query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Score' AND xtype='U')
            CREATE TABLE
                Score (
                    username varchar(50) PRIMARY KEY,
                    score INTEGER,
                    lastUpdatedDateTimeUTC DATETIME)`,
        (err) => {
            if (err) {
                console.error(err.message);
            }
        });

    sql.query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='TakenTime' AND xtype='U')
            CREATE TABLE
                TakenTime (
                    time varchar(20) UNIQUE)`,
        (err) => {
            if (err) {
                console.error(err.message);
            }
        });
}

export function getScoreByUsername(username) {
    return new Promise((resolve) => {
        sql.query(`SELECT score
                FROM Score
                WHERE username = '${username}'`,
                (err, result) => {
                    if (err) {
                        resolve(-1);
                    } else {
                        resolve(result.recordset[0].score);
                    }
                });
    });
}

export function upsertUserScore(username, score) {
    return new Promise((resolve) => {
        sql.query(`SELECT username, score FROM Score WHERE username = '${username}'`, (err, result) => {
            if (result) {
                db.run(`UPDATE Score SET score = score + ${score}, lastUpdatedDateTimeUTC = '${new Date().toISOString()}' WHERE username = '${username}'`);
            } else {
                db.run(`INSERT INTO Score (username, score, lastUpdatedDateTimeUTC) VALUES ('${username}', ${score}, '${new Date().toISOString()}')`);
            }
            resolve();
        });
    });
}

export function markTimeAsTaken(time) {
    return new Promise((resolve) => {
        sql.query(`INSERT INTO TakenTime (time) VALUES ('${time}')`, resolve);
    });
}

export function isTimeTaken(time) {
    return new Promise((resolve) => {
        sql.query(`SELECT 1 as taken FROM TakenTime WHERE time = '${time}'`, (err, result) => {
            if (result.recordset[0].taken === 1) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
}

export function getAllScores() {
    return new Promise((resolve) => {
        sql.query(`SELECT username, score, lastUpdatedDateTimeUTC FROM Score`, (err, result) => {
            resolve(result.recordset);
        })
    });
}
