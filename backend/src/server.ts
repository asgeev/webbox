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

const uploadSingleFile = upload.single("file");

app.post("/upload", (req: express.Request, res: express.Response) => {
  uploadSingleFile(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.end("Max file size 2MB allowed!");
    } else if (err) {
      res.status(415).send(err.message);
    } else if (!req.file) {
      res.status(415).send("File is required!");
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
