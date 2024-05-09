import fs from "fs";
import { Database } from "sqlite3";

const filepath = process.env.DB_PATH || "./sqlite.db";

export const createDbConnection = () => {
  if (fs.existsSync(filepath)) {
    return new Database(filepath);
  } else {
    const db = new Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
};

export const createTable = (db: Database) => {
  db.exec(`
    CREATE TABLE files
    (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      name   VARCHAR(50) NOT NULL,
      color   VARCHAR(50) NOT NULL,
      weight INTEGER NOT NULL
    );`);
};

export const insertRow = (db: Database) => {
  const name = "test";
  const color = "color";
  const weight = "weight";

  db
    ? db.run(
        `INSERT INTO files (name, color, weight) VALUES (?, ?, ?)`,
        [name, color, weight],
        function (error: unknown) {
          if (error) {
            console.error(error);
          }
          console.log(`Inserted a row with the ID: lastID}`);
        },
      )
    : new Error("Cannot insert a row to database");
};
