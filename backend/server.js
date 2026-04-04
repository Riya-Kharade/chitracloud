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
  UpdateCommand   
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
    const userId = req.body.userId;
    const type = req.body.type || "original";
    console.log("Uploading for user:", userId);
    const imageId = uuidv4();

    await docClient.send(
      new PutCommand({
        TableName: "ChitraCloudImages",
        Item: {
          id: imageId,
          userId: userId,
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

// ================= GET =================
app.get("/images", async (req, res) => {
  try {
    const userId = req.query.userId;

    console.log("Fetching images for user:", userId);

    const data = await docClient.send(
      new ScanCommand({
        TableName: "ChitraCloudImages",
      })
    );

   const filtered = (data.Items || []).filter(
  (img) => img.userId && img.userId === userId
);
    res.json(filtered);
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

//rename
app.put("/rename/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    console.log("Rename API called:", id, name); // 🔥 DEBUG

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    await docClient.send(
      new UpdateCommand({
        TableName: "ChitraCloudImages",
        Key: { id: id },
        UpdateExpression: "set #n = :name",
        ExpressionAttributeNames: {
          "#n": "name",
        },
        ExpressionAttributeValues: {
          ":name": name,
        },
      })
    );

    res.json({ message: "Renamed successfully" });

  } catch (err) {
    console.error("RENAME ERROR:", err);
    res.status(500).json({ error: "Rename failed" });
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    console.log("Contact Data:", name, email, message);

    await docClient.send(
      new PutCommand({
        TableName: "ChitraCloudContacts",
        Item: {
          id: Date.now().toString(),
          name,
          email,
          message,
          createdAt: new Date().toISOString(),
        },
      })
    );

    res.json({ success: true });
  } catch (error) {
    console.error("CONTACT ERROR:", error);
    res.status(500).json({ success: false });
  }
});


app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});