# ☁️ ChitraCloud

ChitraCloud is a **cloud-based image editing and storage platform** that allows users to upload, edit, manage, and store images with real-time processing and scalable cloud architecture.

---

## 🚀 Project Vision

The goal of ChitraCloud is to build a **complete cloud-powered image editing system** that combines modern UI/UX with real-world cloud computing concepts.

---

## 🟢 Phase 1 – Core Features (Completed ✅)

### 📤 Image Upload

* Upload images from local system
* Send to backend server
* Store securely in cloud

### ☁️ Cloud Storage

* Store images using AWS S3
* Retrieve image URLs
* Persistent cloud access

### 🖼 Image Preview

* Display selected image
* Show metadata:

  * File name
  * Size
  * Resolution

### 🎛 Auto Filters (Suggestions)

* Enhance
* Warm
* Cool
* Vivid
* Soft

### 🔄 Transform Tools

* Rotate Left
* Rotate Right
* Flip Horizontal
* Flip Vertical

### 🎚 Adjust Controls

* Brightness
* Contrast
* Saturation
* Exposure
* Highlights *(simulated)*
* Shadows *(simulated)*
* White Point *(simulated)*

### 🖼 Gallery System

* View all uploaded images
* Select image for editing
* Delete images

### 📥 Download Feature

* Download edited image with applied changes

### 🌗 Theme

* Dark / Light mode support

---

## 🟡 Phase 2 – Upcoming Enhancements

### 🔁 Undo / Redo

* Track editing steps
* Revert changes

### ✂ Crop Tool

* Interactive crop (drag & resize)
* Inline editing

### 📏 Resize Image

* Modify image dimensions

### 🔍 Search in Gallery

* Quickly find images

### 📝 Rename Image

* Custom naming for images

---

## 🔵 Phase 3 – Advanced Features

### 👤 User Authentication

* Login / Signup system

### ☁️ Personal Cloud Storage

* User-specific image storage

### 🔗 Image Sharing

* Generate shareable links

### ⚡ Image Optimization

* Compression for faster loading
* Performance improvements

### 📊 Dashboard

* Total images uploaded
* Storage usage statistics

---

## ☁️ AWS Services Used

### ✅ Currently Implemented

* **Amazon S3**
  → Image storage and retrieval

* **AWS IAM**
  → Secure access management

---

### 🔜 Planned Cloud Integration

* **Amazon DynamoDB**
  → Store image metadata and user data

* **AWS Lambda**
  → Serverless image processing

* **Amazon CloudFront**
  → Fast global image delivery

* **Amazon Cognito**
  → User authentication system

---

## 🛠 Tech Stack

### Frontend

* React.js
* CSS Modules

### Backend

* Node.js
* Express.js
* Multer

### Cloud

* AWS S3
* AWS SDK

---

## 📂 Project Structure

```
client/
  ├── components/
  ├── pages/
  ├── styles/

server/
  ├── server.js
```

---

## ⚙️ How to Run

### Clone Repository

```
git clone https://github.com/your-username/chitracloud.git
```

### Install Dependencies

Frontend:

```
cd client
npm install
npm start
```

Backend:

```
cd server
npm install
node server.js
```

---

## 🎯 Objective

To demonstrate practical implementation of **cloud computing concepts** through a real-world application combining **image processing, cloud storage, and scalable architecture**.

---

## 👩‍💻 Author

**Riya Sunil Kharade**

---

## ⭐ Note

This project is designed as a **scalable cloud application** and will continue evolving with advanced features and optimizations.
