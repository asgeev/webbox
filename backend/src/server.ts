import express from "express";
import cors from "cors";
import multer from "multer";
import { upload } from "./multer";
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

app.post("/upload", (req: express.Request, res: express.Response) => {
  const uploadSingleFile = upload.single("file");

  uploadSingleFile(req, res, (err) => {
    console.log(req.file);
    if (err instanceof multer.MulterError) {
      return res.status(400).end(err.message);
    }
    if (err) {
      return res.status(400).end(err.message);
    }
    if (!req.file) {
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
