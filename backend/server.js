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

// 🔍 DEBUG (REMOVE LATER)
console.log("ACCESS:", process.env.AWS_ACCESS_KEY);
console.log("SECRET:", process.env.AWS_SECRET_KEY);

// ================= MULTER =================
const upload = multer({ storage: multer.memoryStorage() });

// ================= AWS S3 CONFIG =================
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});

// ================= UPLOAD API =================
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

    // Upload to S3
    const uploadResult = await s3.upload(params).promise();

    const imageId = uuidv4();

    // Save metadata in DynamoDB
    await docClient.send(
      new PutCommand({
        TableName: "ChitraCloudImages",
        Item: {
          id: imageId,
          url: uploadResult.Location,
          name: req.file.originalname,
          size: req.file.size,
          uploadedAt: new Date().toISOString(),
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
    res.status(500).json({ error: "Upload failed" });
  }
});

// ================= GET ALL IMAGES =================
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

// ================= DELETE IMAGE =================
app.delete("/delete/:id", async (req, res) => {
  try {
    const imageId = req.params.id;

    // Get all items
    const data = await docClient.send(
      new ScanCommand({
        TableName: "ChitraCloudImages",
      })
    );

    const item = data.Items.find((img) => img.id === imageId);

    if (!item) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Extract S3 key
    const key = item.url.split(".com/")[1];

    // Delete from S3
    await s3
      .deleteObject({
        Bucket: "chitracloud-riya-210",
        Key: key,
      })
      .promise();

    // Delete from DynamoDB
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

// ================= SERVER =================
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});