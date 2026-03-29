import React, { useEffect, useState } from "react";
import styles from "./GalleryGrid.module.css";

function GalleryGrid() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/images")
      .then((res) => res.json())
      .then((data) => {
        console.log("API Response:", data);
        setImages(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setImages([]);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });

      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.galleryWrapper}>
      <h2>Gallery</h2>

      <div className={styles.galleryGrid}>
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className={styles.card}>
              <img src={img.url} alt={img.name} />

              <div className={styles.info}>
                <p>{img.name}</p>
                <button onClick={() => handleDelete(img.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )}
      </div>
    </div>
  );
}

export default GalleryGrid;