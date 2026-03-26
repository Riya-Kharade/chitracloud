const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const cors = require("cors");

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

// AWS config (we will fill later)
AWS.config.update({
  accessKeyId: "ADD ACCESS KEY ID",
  secretAccessKey: "ADD SECRET ACCESS KEY",
  region: "ap-south-1",
});

const s3 = new AWS.S3();

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const params = {
    Bucket: "chitracloud-riya-210",
    Key: Date.now() + "-" + req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) return res.status(500).send(err);

    res.json({
      url: data.Location,
      name: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype,
    });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));