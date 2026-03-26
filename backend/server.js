const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");
const express = require("express");
const multer = require("multer");
const AWS = require("aws-sdk");
const cors = require("cors");

const { docClient } = require("./dynamodb");
const { PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

// AWS S3 config
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  region: "ap-south-1",
});

const s3 = new AWS.S3();


// ================= UPLOAD API =================
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const params = {
    Bucket: "chitracloud-riya-210",
    Key: Date.now() + "-" + req.file.originalname,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, async (err, data) => {
    if (err) return res.status(500).send(err);

    try {
      const imageId = uuidv4();

      // Save to DynamoDB
      await docClient.send(
        new PutCommand({
          TableName: "ChitraCloudImages",
          Item: {
            id: imageId,
            url: data.Location,
            name: req.file.originalname,
            size: req.file.size,
            uploadedAt: new Date().toISOString(),
          },
        })
      );

      res.json({
        url: data.Location,
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
      });
    } catch (dbError) {
      console.error("DynamoDB Error:", dbError);
      res.status(500).json({ error: "DynamoDB error" });
    }
  });
});


// ================= GET ALL IMAGES =================
app.get("/images", async (req, res) => {
  try {
    const command = new ScanCommand({
      TableName: "ChitraCloudImages",
    });

    const data = await docClient.send(command);

    res.json(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const imageId = req.params.id;

  try {
    // 1️⃣ Get all items
    const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

    const data = await docClient.send(
      new ScanCommand({
        TableName: "ChitraCloudImages",
      })
    );

    // 2️⃣ Find image by ID
    const item = data.Items.find((img) => img.id === imageId);

    if (!item) {
      return res.status(404).json({ error: "Image not found" });
    }

    // 3️⃣ Extract S3 key from URL
    const urlParts = item.url.split(".com/");
    const key = urlParts[1];

    // 4️⃣ Delete from S3
    await s3
      .deleteObject({
        Bucket: "chitracloud-riya-210",
        Key: key,
      })
      .promise();

    // 5️⃣ Delete from DynamoDB
    await docClient.send(
      new DeleteCommand({
        TableName: "ChitraCloudImages",
        Key: { id: imageId },
      })
    );

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});
// ================= SERVER =================
app.listen(5000, () => console.log("Server running on port 5000"));