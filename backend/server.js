require("dotenv").config();

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const AWS = require("aws-sdk");

const { docClient } = require("./dynamodb");
const {
  PutCommand,
  ScanCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});

// ================= UPLOAD =================
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const key = Date.now() + "-" + req.file.originalname;

    const params = {
      Bucket: "chitracloud-riya-210",
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const uploadResult = await s3.upload(params).promise();
const type = req.body.type || "original";
    const imageId = uuidv4();

    await docClient.send(
      new PutCommand({
        TableName: "ChitraCloudImages",
        Item: {
          id: imageId,
          url: uploadResult.Location,
          name: req.file.originalname,
          size: req.file.size,
          uploadedAt: new Date().toISOString(),
          type: type
        },
      })
    );

    res.json({
      id: imageId,
      url: uploadResult.Location,
      name: req.file.originalname,
      size: req.file.size,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ================= GET =================
app.get("/images", async (req, res) => {
  try {
    const data = await docClient.send(
      new ScanCommand({
        TableName: "ChitraCloudImages",
      })
    );

    res.json(data.Items || []);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// ================= DELETE =================
app.delete("/delete/:id", async (req, res) => {
  try {
    const imageId = req.params.id;

    const data = await docClient.send(
      new ScanCommand({
        TableName: "ChitraCloudImages",
      })
    );

    const item = data.Items.find((img) => img.id === imageId);

    if (!item) {
      return res.status(404).json({ error: "Image not found" });
    }

    const key = item.url.split(".amazonaws.com/")[1];

    await s3.deleteObject({
      Bucket: "chitracloud-riya-210",
      Key: key,
    }).promise();

    // ✅ FIXED LINE
    await docClient.send(
      new DeleteCommand({
        TableName: "ChitraCloudImages",
        Key: { id: imageId },
      })
    );

    res.json({ message: "Deleted successfully" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
});


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});