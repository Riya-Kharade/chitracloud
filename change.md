# Image Gallery System

## 📌 Objective

Build a **React-based Image Gallery System** with real-time updates, preview functionality, and AWS backend integration.

---

## 🚀 Requirements

### 🖼 Gallery Display

* Fetch images from backend API (`GET /images`)
* Store images in React state
* Display images in a **responsive grid layout**
* Each image card should include:

  * Image preview
  * Image name
  * Delete button

---

### ⚡ Real-Time Update

* After uploading a new image:

  * Add it instantly to the gallery
  * No page refresh required
  * Update UI dynamically using state

---

### 🗑 Delete Feature

* Call API: `DELETE /delete/:id`
* Remove image from UI immediately after deletion

---

### 👆 Image Preview

* When user clicks on an image:

  * Show it in a **preview section**
  * Maintain a `selectedImage` state

---

### ⚠️ Empty State

* If no images are available:

  * Show message: `"No images found"`

---

### 🧠 Technical Requirements

* Use **React Hooks** (`useState`, `useEffect`)
* Use **async/await** for API calls
* Maintain clean and modular code structure
* Use **CSS Modules** for styling
* Follow **production-level coding practices**

---

## 🎨 UI Expectations

* Responsive grid layout
* Card-based design
* Hover effects for better UX
* Clean and modern interface

---

## 🌐 Backend Integration

* Compatible with:

  * AWS S3 (image storage)
  * DynamoDB (metadata storage)

---

## ⭐ Goal

Create a **smooth, real-time, and user-friendly image gallery experience** similar to modern cloud-based apps.
