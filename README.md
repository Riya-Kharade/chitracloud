# 🌩️ ChitraCloud

A **Cloud-Based Image Editing Web Application** built using **React.js, Node.js, and AWS S3**.
ChitraCloud allows users to upload, edit, and manage images with real-time preview and cloud storage support.

---

## 🚀 Features

### 🟢 Core Features (Completed)

* 📤 Upload images from device
* ☁️ Store images in AWS S3
* 🖼 Real-time image preview
* 📊 Display metadata (name, size, resolution)
* 🎨 Auto Filters (Suggestions)

  * Enhance, Warm, Cool, Vivid, Soft
* 🔄 Transform Tools

  * Rotate Left / Right
  * Flip Horizontal / Vertical
* 🎚 Adjust Controls

  * Brightness, Contrast, Saturation, Exposure
  * Highlights, Shadows, White Point
* 🖼 Gallery System

  * View uploaded images
  * Select & delete images
* 📥 Download edited image
* 🌗 Dark / Light mode UI

---

## 🧠 Upcoming Features

### 🟡 Phase 2

* Undo / Redo
* Advanced Crop Tool (inline)
* Resize Image
* Search in Gallery
* Rename Image

### 🔵 Phase 3

* User Authentication
* Personal Cloud Storage
* Shareable image links
* Image optimization (compression)
* Dashboard (usage stats)

---

## ☁️ AWS Integration

### ✅ Currently Used

* **Amazon S3** → Image storage
* **AWS IAM** → Access management

### 🔜 Planned

* **Amazon DynamoDB** → Metadata storage
* **AWS Lambda** → Image processing
* **CloudFront** → Faster delivery
* **Cognito** → Authentication

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Backend:** Node.js + Express
* **Cloud:** AWS S3
* **Styling:** CSS Modules

---

## 📂 Project Structure

```
chitracloud/
│
├── backend/
│   ├── server.js
│   ├── package.json
│
├── public/
│   ├── index.html
│   ├── assets
│
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│
├── .gitignore
├── package.json
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/Riya-Kharade/chitracloud.git
cd chitracloud
```

### 2️⃣ Install Dependencies

Frontend:

```
npm install
```

Backend:

```
cd backend
npm install
```

### 3️⃣ Run Project

Backend:

```
node server.js
```

Frontend:

```
npm start
```

---

## 🎯 Project Objective

To build a **modern cloud-based image editor** with:

* Real-time editing experience
* Cloud storage integration
* Scalable architecture
* Clean and interactive UI

---

## 📌 Future Scope

* AI-powered filters 🤖
* Smart auto-enhancement
* Mobile responsive design
* Multi-user support

---

## 👩‍💻 Author

**Riya Sunil Kharade**
Engineering Student | Web Developer

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
