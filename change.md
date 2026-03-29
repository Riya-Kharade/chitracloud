# 🚀 Feature: Edited Image Storage & Dual Gallery System

## 🎯 Objective

Enhance **ChitraCloud** to support both **Original Images** and **Edited Images**.

The application should:

* Store images in **AWS S3**
* Save metadata in **DynamoDB**
* Display images in **two separate galleries**

  * 📸 Original Images
  * 🎨 Edited Images

---

## 🧠 Architecture Decision

### ✅ Use Single DynamoDB Table

Instead of creating multiple tables, extend the existing table:

**Table Name:** `ChitraCloudImages`

Add a new attribute:

```json
"type": "original" | "edited"
```

---

## 🛠 Backend Changes (Node.js + Express)

### 1️⃣ Update Upload API

Accept image type from request:

```js
const type = req.body.type || "original";
```

Store in DynamoDB:

```js
Item: {
  id: imageId,
  url: uploadResult.Location,
  name: req.file.originalname,
  size: req.file.size,
  uploadedAt: new Date().toISOString(),
  type: type
}
```

---

## 🎨 Frontend Changes (React)

### 2️⃣ Upload Edited Image

After editing (canvas):

```js
canvas.toBlob(async (blob) => {
  const formData = new FormData();
  formData.append("image", blob, "edited.png");
  formData.append("type", "edited");

  await fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  });
});
```

---

### 3️⃣ Separate Images

Split images into two groups:

```js
const originalImages = gallery.filter(img => img.type === "original");
const editedImages = gallery.filter(img => img.type === "edited");
```

---

### 4️⃣ Render Two Galleries

```jsx
<h2>📸 Original Images</h2>
<GalleryGrid images={originalImages} />

<h2>🎨 Edited Images</h2>
<GalleryGrid images={editedImages} />
```

---

## 🎯 Expected Output

* Original uploads → shown in **Original Gallery**
* Edited images → shown in **Edited Gallery**
* Both stored in same database
* Clean and scalable structure

---

## 💡 Future Scope

* 🔄 Version history
* 🆚 Compare original vs edited
* ❤️ Favorite images
* 🔍 Search & filter
* 🤖 AI auto-enhance

---

## 🏁 Result

A more powerful **cloud-based image editor** with structured storage and better user experience.

---
