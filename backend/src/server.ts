import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();

//TODO: add port from env file
const port = 3001;
const maxFileSize = 10 * 1000 * 1000;

const allowedOrigins = ["http://localhost:3000"];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

const MIME_TYPE_MAP: Array<string> = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "image/gif",
  "text/csv",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/rtf",
  "application/xml",
  "application/vnd.rar",
  "application/zip",
  "application/x-7z-compressed",
  "text/plain",
];

const storage = multer.diskStorage({
  destination: function (req: express.Request, file, cb) {
    cb(null, "./uploads");
  },
  filename: (req: express.Request, file, cb) => {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname);
  },
});

const fileFilter = (req: express.Request, file: any, cb: any) => {
  if (!MIME_TYPE_MAP.includes(file.mimetype)) {
    return cb(new Error("File is not allowed"), false);
  }

  cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: maxFileSize },
  fileFilter: fileFilter,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post(
  "/upload",
  upload.single("file"),
  (req: express.Request, res: express.Response) => {
    console.log(req.file);
    res.send({
      fileUrl: "File uploaded successfully",
    });
  },
);

app.get("/upload/:id", (req: express.Request, res: express.Response) => {
  console.log(req.params.id);
  const path = `./uploads/${req.params.id}`;
  res.download(path);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
