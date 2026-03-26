# 🌩️ ChitraCloud

A **Cloud-Based Image Editing Web Application** built using **React.js, Node.js, and AWS**.
ChitraCloud allows users to **upload, edit, and manage images** with real-time preview and secure cloud storage.

---

## 🚀 Features

### 🟢 Core Features

* 📤 Upload images from device
* ☁️ Store images in AWS S3
* 🖼 Real-time image preview
* 📊 Display metadata (name, size, resolution)

#### 🎨 Editing Features

* Auto Filters:

  * Enhance, Warm, Cool, Vivid, Soft
* Transform Tools:

  * Rotate Left / Right
  * Flip Horizontal / Vertical
* Adjustment Controls:

  * Brightness, Contrast, Saturation
  * Exposure, Highlights, Shadows
  * White Point

#### 🖼 Gallery System

* View uploaded images
* Real-time gallery display
* Delete images

#### 📥 Additional Features

* Download edited image
* 🌗 Dark / Light mode UI

---

## 🧠 Development Roadmap

### 🟢 Phase 1 (Completed – Core Application)

* Image upload from device
* Real-time image preview
* Basic editing tools (filters, rotate, flip)
* Adjustment controls (brightness, contrast, etc.)
* Download edited image
* Dark / Light mode UI

---

### 🟡 Phase 2 (Completed – Cloud Integration)

* ☁️ AWS S3 integration for image storage
* 🗄 DynamoDB integration for metadata storage
* 🖼 Real-time gallery system
* 🗑 Delete image functionality
* 🔐 Secure environment variables (.env) implementation

---

### 🔵 Phase 3 (Planned – Advanced Editing & UX)

* Undo / Redo functionality
* Advanced Crop Tool
* Resize Image
* 🔍 Search in Gallery
* Rename Image
* ⏱ Relative time (e.g., “2 mins ago”)

---

### 🟣 Phase 4 (Planned – User System & Personalization)

* 🔐 User Authentication (AWS Cognito)
* 📂 Personal user storage
* 👤 User-specific gallery
* 🔗 Shareable image links

---

### 🔴 Phase 5 (Planned – Performance & AI)

* ⚡ Image optimization (compression)
* 🌐 CloudFront integration (faster delivery)
* 🤖 AI-powered filters & enhancements
* 📊 Dashboard (usage analytics)

---

## ☁️ AWS Integration

### ✅ Implemented

* **Amazon S3** → Image Storage
* **AWS IAM** → Secure Access

### ✅ Completed (Phase 2)

* **Amazon DynamoDB** → Metadata storage

### 🔜 Planned

* **AWS Lambda** → Serverless processing
* **CloudFront** → Fast delivery
* **AWS Cognito** → Authentication

---

## 🛠️ Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Frontend | React.js          |
| Backend  | Node.js + Express |
| Cloud    | AWS S3, DynamoDB  |
| Styling  | CSS Modules       |

---

## 📂 Project Structure

```id="8yqv61"
chitracloud/
│
├── backend/
│   ├── server.js
│   ├── dynamodb.js
│   ├── package.json
│
├── public/
│   ├── index.html
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

```id="3v9xog"
git clone https://github.com/Riya-Kharade/chitracloud.git
cd chitracloud
```

### 2️⃣ Install Dependencies

Frontend:

```id="11v7m0"
npm install
```

Backend:

```id="q8b9c1"
cd backend
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env` file inside `backend/`:

```id="x7y2p0"
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
AWS_REGION=ap-south-1
S3_BUCKET_NAME=your_bucket_name
```

---

### 4️⃣ Run the Project

Backend:

```id="b5l2o9"
node server.js
```

Frontend:

```id="p4n6k2"
npm start
```

---

## 🎯 Project Objective

To build a **modern, scalable cloud-based image editor** that:

* Provides real-time editing
* Uses cloud storage efficiently
* Ensures secure data handling
* Delivers a smooth and interactive UI

---

## 🌟 Future Scope

* 🤖 AI-powered filters
* 🧠 Smart auto-enhancement
* 📱 Fully responsive design
* 👥 Multi-user collaboration

---

## 👩‍💻 Author

**Riya Sunil Kharade**
Engineering Student | Web Developer

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
