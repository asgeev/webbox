import fs from "fs";
import { Database } from "sqlite3";

type fileTypes = {
  originalFileName: string;
  fileNameWithExt: string;
  fileExt: string;
  fileMime: string;
  fileSize: number;
  path: string;
  uploadDate: string | number | Date;
  deleteDate?: string | number | Date;
};

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
      originalFileName VARCHAR(300) NOT NULL,
      fileNameWithExt VARCHAR(300) NOT NULL,
      fileExt VARCHAR(3) NOT NULL,
      fileMime VARCHAR(50) NOT NULL,
      fileSize INT(255) NOT NULL,
      path VARCHAR(50) NOT NULL,
      uploadDate timestamp NOT NULL,
      deleteDate timestamp
    );`);
};

// Function to insert a row into the database
export const insertRow = ( data: fileTypes): Promise<void> => {
    const db = createDbConnection()
  return new Promise<void>((resolve, reject) => {
    // Prepare the SQL statement
    const sql = `INSERT INTO files ( 
      originalFileName,
      fileNameWithExt,
      fileExt,
      fileMime,
      fileSize,
      path,
      uploadDate,
      deleteDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    // Execute the SQL statement
    db.run(
      sql,
      [
        data.originalFileName,
        data.fileNameWithExt,
        data.fileExt,
        data.fileMime,
        data.fileSize,
        data.path,
        data.uploadDate,
      ],
      (err) => {
        if (err) {
            console.log(err)
          reject(err);
        } else {
          resolve();
        }
        // Close the database connection
        db.close();
      },
    );
  });
};

// Function to update a row after deleting a file
export const updateRowAfterDeleteFile = (
  db: Database,
  id: number,
  newData: any,
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    // Prepare the SQL statement
    const sql = `UPDATE files fileName = ?, fileExt = ?, fileNameExt = ?, fileMime = ?, fileSize = ?, uploadDate = ?, deleteDate = ? WHERE ID = ?`;

    // Execute the SQL statement
    db.run(
      sql,
      [
        newData.fileName,
        newData.fileExt,
        newData.fileNameExt,
        newData.fileMime,
        newData.fileSize,
        newData.uploadDate,
        newData.deleteDate,
        id,
      ],
      (err) => {
        if (err) {
            console.log(err)
          reject(err);
        } else {
          resolve();
        }
        // Close the database connection
        db.close();
      },
    );
  });
};
