import express from "express";
import cors from "cors";
import multer from "multer";
import { upload } from "./multer";
import { createDbConnection, insertRow } from "./db";
const app = express();

//TODO: add port from env file
const port = 3001;

app.use(
  cors({
    origin: ["http://localhost:3000"],
  }),
);

app.get("/", (req, res) => {
  res.send("Hello from webbox!");
});

const db = createDbConnection();

console.log(db);

app.post("/upload", (req: express.Request, res: express.Response) => {
  const uploadSingleFile = upload.single("file");

  insertRow(db);

  uploadSingleFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(`Multer error: ${err.message}`);
      return res.status(400).end(err.message);
    } else if (err) {
      return res.status(400).end(err.message);
    } else if (!req.file) {
      return res.status(400).end("File required");
    } else {
      res.send("File successfully uploaded");
      res.status(200);
    }
  });
});

app.get("/upload/:id", (req: express.Request, res: express.Response) => {
  console.log(req.params.id);
  const path = `./uploads/${req.params.id}`;
  res.download(path);
});

app.listen(port, () => {
  console.log(`Webbox listening on port ${port}`);
});
