import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

//TODO: add port from env file
const port = 3001;

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(
  "/upload",
  upload.single("file"),
  (req: express.Request, res: express.Response) => {
    res.send({
      fileUrl: "File uploaded successfully",
    });
  },
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
