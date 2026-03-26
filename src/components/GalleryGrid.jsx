import React, { useEffect, useState } from "react";
import styles from "./GalleryGrid.module.css";

function GalleryGrid() {
  const [images, setImages] = useState([]);

  // 🔥 Fetch images
  useEffect(() => {
    fetch("http://localhost:5000/images")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // 🔥 Delete function
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });

      // remove from UI instantly
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.galleryGrid}>
      {images.map((img) => (
        <div key={img.id} className={styles.card}>
          <img src={img.url} alt={img.name} />
          <p>{img.name}</p>

          {/* 🔥 Delete Button */}
          <button
            className={styles.deleteBtn}
            onClick={() => handleDelete(img.id)}
          >
            🗑 Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default GalleryGrid;