import React from "react";
import styles from "./GalleryGrid.module.css";

function GalleryGrid({ images, onSelect, onDelete }) {
  return (
    <div className={styles.galleryWrapper}>
      <h2>Gallery</h2>

      <div className={styles.galleryGrid}>
        {images.length > 0 ? (
          images.map((img) => (
            <div key={img.id} className={styles.card}>
              <img
                src={img.url}
                alt={img.name}
                onClick={() => onSelect(img)} // ✅ preview click
              />

              <div className={styles.info}>
                <p>{img.name}</p>

                <button onClick={() => onDelete(img.id)}>
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